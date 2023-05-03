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

useEffect(()=>{
  fetch(`/watchlist2`)
  .then((r) => r.json())
  .then((stock)=> {
      setStock(stock);
      console.log(stock)
  });
},[])
 return (
  <>
  {stocks.map((stock)=>(
    <p key={stock.id}>{stock.name}</p>

  ))}
  </>
 )

}