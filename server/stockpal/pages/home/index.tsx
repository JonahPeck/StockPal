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
    const stocksRes = await fetch('http://127.0.0.1:5555/stocks');
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
        router.push('/stocks')
      } 
      const router = useRouter();

      console.log(currUser)
    if (!currUser) {
        return (
        <>
        <h2>Please login </h2>
        <h2>L</h2>
        
        </>
        );
    } else {
        return (
            <>
            <h1>Welcome {currUser.username}</h1>
            </>
        )
    }

}