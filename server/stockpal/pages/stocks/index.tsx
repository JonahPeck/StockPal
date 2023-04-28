import React from 'react'
import { useEffect } from 'react'
import {useState} from "react" 
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

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


export default function index({stocks}){
    const router = useRouter();
    if (router.isFallback){
        return <div>Loading those Stocks baby</div>
    }
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {stocks.map((stock) => (
    <div key={stock.id} className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-black">{stock.symbol}</h2>
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


    )
}
