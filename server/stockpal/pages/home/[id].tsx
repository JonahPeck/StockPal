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
    <div className="card w-96 bg-primary text-primary-content">
  <div className="card-body">
  
    <h2 className="card-title">{stock.symbol}</h2>
    <p>{stock.name}</p>
    <p>{stock.sector}</p>
    <div className="card-actions justify-end">
        <div>
            <Price symbol={stock.symbol} />
        </div>
      <button className="btn">Add to Portfolio</button>
    </div>
  </div>
</div>
    </>
)
}