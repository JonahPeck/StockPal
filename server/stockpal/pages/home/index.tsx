import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { use } from "react";
// import Trails from './Trails'
import { useState } from "react";
import { cursorTo } from "readline";

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
export default function App({stocks,currUser}) {
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {stocks.map((stock) => (
    <div key={stock.id} className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <Link as = {`home/${stock.id}`} href = "/home/[id]">
            
        <h2 className="font-bold text-black">{stock.symbol}</h2>
        </Link>

        {/* <p className={`text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
          {stock.change} ({stock.percentChange}%)
        </p> */}
      </div>
      <p className="text-sm font-medium text-gray-600">{stock.name}</p>
      {/* <p className="text-sm font-medium text-gray-500">{stock.symbol}</p> */}
      <p className="text-sm font-medium text-gray-400">{stock.sector}</p>
    </div>
  ))}
</div>


    
            </>
        )
    }

}