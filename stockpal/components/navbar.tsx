import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { use } from "react";
// import StockList from "../pages/stocks";
import { useState } from "react";
import setcurrUser from "../pages/_app";

function handleHomeRoute(e) {
  e.preventDefault();
  window.location.href = '/home';
}
// function handleChartRoute(e){
//   e.preventDefault();
//   window.location.href = '/Charts'
// }
function handleNewsRoute(e){
  e.preventDefault();
  window.location.href = '/News'
}
export default function Navbar({ currUser, setcurrUser }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [stocks, setStocks] = useState([])



  if (!currUser) {
    return <div className="text-dblue"></div>;
  }
  const router = useRouter();
  // console.log(currUser);

function handleAddToWatchlist(e) {
    e.preventDefault();
    fetch("/watchlist", {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    router.push("/watchlist")
}
  
  function handleLogout(e) {
    e.preventDefault();
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setcurrUser(null);
    router.push("/");
  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
        <div className="dropdown" style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
        <div className="flex space-x-4">
  <button
    onClick={handleLogout}
    className="text-lg font-medium text-gray-700 hover:text-gray-800"
  >
    Logout
  </button>

  {/* <button
    onClick={handleChartRoute}
    className="text-lg font-medium text-gray-700 hover:text-gray-800"
  >
    S&P500 Historical Trend
  </button> */}
  <button
    onClick={handleNewsRoute}
    className="text-lg font-medium text-gray-700 hover:text-gray-800"
  >
    Today's News
  </button>
  <button
    onClick={handleHomeRoute}
    className="text-lg font-medium text-gray-700 hover:text-gray-800"
  >
    S&P 500
  </button>
  <button
    onClick={handleAddToWatchlist}
    className="text-lg font-medium text-gray-700 hover:text-gray-800"
  >
    My Watchlist
  </button>
</div>
</div>
        </div>
        <div className="navbar-center flex items-center justify-center">
        <div className="text-xl font-bold mr-4">
          </div>
        </div>
        <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <div className="avatar">
              <div className="w-18 h-18 mask mask-squircle bg-gray-300"></div>
              </div>
            </div>
          </button>
        </div>
    </>
  );
}