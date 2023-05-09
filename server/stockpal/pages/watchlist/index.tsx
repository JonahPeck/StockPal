import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { use } from "react";
import { useState, useEffect } from "react";
import { cursorTo } from "readline";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps (){
  const stockRes = await fetch('http://127.0.0.1:5555/watchlist2');
  const stockData = await stockRes.text()
  const stocks = JSON.parse(stockData)

  return {
      props:{
          stocks
      },
  }
}
export default function App({stocks,currUser}) {
  const [stock, setStock] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // add to portfolio functionality

  function getWatchlist(){
    fetch('/watchlist2')
    .then((r) => r.json())
    .then((watchlist)=> {
      setStock(watchlist);
      console.log(watchlist)
  });
}
useEffect(() => {
  getWatchlist();
}, []);

  function handleDeleteFromWatchlist(currId) {
    // e.preventDefault();
    console.log(currId)
      const data = {
        "id": currId,
        // "user_id": user_id,

      };// e.preventDefault();
      console.log("removing from watchlist")
      // console.log(stock)
      console.log(data)
      fetch(`/watchlist2/${currId}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(()=> {
        getWatchlist();
      })
     
  }
  

useEffect(()=>{
  fetch(`/watchlist2`)
  .then((r) => r.json())
  .then((stock)=> {
      setStock(stock);
      // console.log(typeof stock)
  });
},[])
return (
  <>
    <title>Watchlist</title>
    <div className="flex justify-center items-center h-48 overflow-hidden">
  <h1 className="text-4xl font-bold text-gray-800 animate-marquee">Welcome To Your Watchlist</h1>
</div>
    {stock && (
  <div className="flex flex-wrap justify-center">
    {stock.map((item) => (
      <div key={item.id} className="card w-96 bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="card-body flex flex-col items-center">
          {item.stocks ? (
            <div>

              <h2 className="card-title text-2xl font-bold mb-2 justify-center">{item.stocks.name}</h2>
              <div className="grid grid-cols-3 gap-4">
                 <Link as = {`home/${item.stocks.id}`} href = "/home/[id]">
                <div>
                  <p className="text-lg font-bold">Symbol:</p>
                  <p>{item.stocks.symbol}</p>
                </div>
                <div>
                  <p className="text-lg font-bold justify-center">Sector:</p>
                  <p>{item.stocks.sector}</p>
                </div>
                </Link>
                {/* render other properties as needed */}
              </div>
              <div>
                <br></br>
              <button onClick={(e) => (handleDeleteFromWatchlist(item.stocks.id))} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Remove From Watchlist</button>

              </div>
            </div>
          ) : (
            <p>No associated stock</p>
          )}
        </div>
      </div>
    ))}
  </div>
)}

  </>
);


}