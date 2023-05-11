import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { use } from "react";
import { useState, useEffect } from "react";
import { cursorTo } from "readline";
import {parse} from "csv-parse";
import ChatGPT from "@/components/chat";

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
  const [url, setUrl] = useState('')

 

  useEffect(() => {
    fetch("/test.csv")
      .then((response) => response.text())
      .then((csv) => {
        parse(csv, {}, (err, output) => {
          setData(output);
        });
      });
  }, []);

console.log(stocks)
  const filteredData = searchQuery === '' ? stocks: stocks.filter((item) =>
    item.name.toLowerCase().startsWith(  searchQuery.toLowerCase()) ||
    item.symbol.toLowerCase().startsWith(  searchQuery.toLowerCase()) ||
    item.sector.toLowerCase().startsWith(  searchQuery.toLowerCase())
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

      


      // console.log(currUser)
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
            <input 
  type="text" 
  value={searchQuery} 
  placeholder="Search for a Stock by Name, Symbol, or Sector" 
  onChange={(e)=> setSearchQuery(e.target.value)}
  className="w-1/2 px-3 py-2 placeholder-gray-500 text-gray-900 bg-white rounded-md text-m border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
/>
<ChatGPT/>
<br></br>
<br></br>
<br></br>


            <ul>
              {/* {filteredData.map((item, index)=> (
                <li key={index}> {item.name}</li>
              ))} */}
            </ul>
            <img src={url} ></img>

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {filteredData.map((stock) => (
    <div key={stock.id} className="bg-white rounded-lg shadow-md p-4" style={{ border: "1.5px solid #7CFC00" }}>
      <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
  <Link as={`home/${stock.id}`} href="/home/[id]">
    <div className="flex items-center">
      <img src={stock.logo} alt={stock.symbol} className="w-24 h-20 mr-4" />
      <div>
        <h1 className="text-lg font-bold text-gray-600">{stock.name}</h1>
        <h2 className="text-lg font-bold text-gray-900">{stock.symbol}</h2>
        <p className="text-sm font-medium text-gray-400">{stock.sector}</p>
      </div>
    </div>
  </Link>
</div>

    </div>
  ))}
</div>
            </>
        )
    }

}