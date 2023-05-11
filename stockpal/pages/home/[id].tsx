import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Price from "@/components/liveprice";

export default function Stock({currUser}) {
    const [stock, setStock] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    // add to portfolio functionality

useEffect(()=>{
    fetch(`/home/${id}`)
    .then((r) => r.json())
    .then((stock)=> {
        setStock(stock);
        console.log(stock)
    });
},[])
if (!stock) {
    return <div className="text-blue">Loading Stocks...</div>;
}
return (
    <>
    <div className="bg-primary text-primary-content p-4 mb-4">
      <div className="card w-full">
      <div className="card-body flex flex-col items-center justify-center">
  <h2 className="card-title text-3xl font-bold">{stock.symbol}</h2>
  <p className="text-xl font-bold">{stock.name}</p>
  <p className="text-xl font-bold">{stock.sector}</p>
  <div className="card-actions justify-center mt-4">
    <div>
      <Price symbol={stock.symbol} stock={stock} />
    </div>
  </div>
</div>

      </div>
    </div>
  </>
  
)
}
