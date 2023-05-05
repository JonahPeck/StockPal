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
  const router = useRouter();
  const { id } = router.query;

  // add to portfolio functionality

  function handleDeleteFromWatchlist(e) {
    // e.preventDefault();
      const data = {
        "id": id,
        // "user_id": user_id,

      };// e.preventDefault();
      console.log("removing from watchlist")
      // console.log(stock)
      console.log(data)
      fetch('/watchlist2',{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    .then(response => response.json())
    .then(data => {
      console.log("Response from server:", data);
      
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
            <button onClick={(e) => console.log(handleDeleteFromWatchlist(item.stocks.id))} className="btn btn-success btn-primary=#7CFC00" style={{ borderColor: '#7CFC00', color: '#7CFC00' }}>Remove From Watchlist</button>

              <h2 className="card-title text-2xl font-bold mb-2">{item.stocks.name}</h2>
              <div className="grid grid-cols-3 gap-4">
                 <Link as = {`home/${item.stocks.id}`} href = "/home/[id]">
                <div>
                  <p className="text-lg font-bold">Symbol:</p>
                  <p>{item.stocks.symbol}</p>
                </div>
                </Link>
                <div>
                  <p className="text-lg font-bold">Sector:</p>
                  <p>{item.stocks.sector}</p>
                </div>
                {/* render other properties as needed */}
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