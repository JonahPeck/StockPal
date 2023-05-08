import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { use } from "react";
import { useState, useEffect } from "react";
import { cursorTo } from "readline";
import {parse} from "csv-parse";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps (){
    const stocksRes = await fetch('http://127.0.0.1:5555/home');
    const stocksData = await stocksRes.text()
    const stocks = JSON.parse(stocksData)

    return {
        props:{
            stocks
        },
    }
}
export default function App({stocks,currUser, symbol}) {

  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [logo, setLogo] = useState("")

 



  useEffect(() => {
    fetch("/test.csv")
      .then((response) => response.text())
      .then((csv) => {
        parse(csv, {}, (err, output) => {
          setData(output);
        });
      });
  }, []);

  useEffect(() => {
    const options = {
      headers: {
        'X-RapidAPI-Key': 'edb1bf48b1mshbd062dbf0793c2dp15ddf4jsndd1028a99649',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    fetch(`https://twelve-data1.p.rapidapi.com/logo?symbol=${symbol}`, options)
      .then(response => response.json())
      .then(data => {
        setLogo(data.symbol.url)
        console.log(data.symbol.url)
        
    })
    .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [symbol]);

  const filteredData = data.filter((item) =>
    item.includes(searchQuery.toLowerCase())
  );
    
    if (!currUser) {
        return <div className="text-dblue">Loading.. </div>;
      }
      if(!currUser){
        const router = useRouter();
        console.log("Pushing")
        router.push('/')
      } 
      const router = useRouter();

      


      console.log(currUser)
    if (!currUser) {
        return (
        <>
        <h2>Please login </h2>
        
        
        </>
        );
    } else {
        return (
            <>
            <title>StockPal 📈 </title>
            <input type="text" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}
            />
            <ul>
              {filteredData.map((item, index)=> (
                <li key={index}> {item}</li>
              ))}
            </ul>
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {stocks.map((stock) => (
    <div key={stock.id} className="bg-white rounded-lg shadow-md p-4" style={{ border: "1.5px solid #7CFC00" }}>
      <div className="flex items-center justify-between">
        <Link as = {`home/${stock.id}`} href = "/home/[id]">
          <img src={logo} alt={symbol}></img>
            <h2 className="font-bold text-black">{stock.symbol}</h2>
        <p className="text-sm font-medium text-gray-600">{stock.name}</p>
        <p className="text-sm font-medium text-gray-400">{stock.sector}</p>
      </Link>
      </div>

    </div>
  ))}
</div>
            </>
        )
    }

}