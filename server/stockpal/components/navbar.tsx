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
export default function Navbar({ currUser, setcurrUser }) {
  if (!currUser) {
    return <div className="text-dblue"></div>;
  }
  const router = useRouter();
  console.log(currUser);

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
          <div className="dropdown">
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={handleLogout}>Logout</button>
                <Link as={`user/${currUser.id}`} href="/user/[something]"></Link>
              </li>
              <li>
                <button onClick={handleHomeRoute}>S&P 500</button>
                <Link href="/home" ></Link>
              </li>
              <li>
                <button onClick={handleAddToWatchlist}>My Watchlist</button>
                <Link href="/watchlist"></Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <div className="btn btn-ghost normal-case text-xl">
          </div>
        </div>
        {/* <div className="navbar-end"> */}
          {/* <button className="btn btn-ghost btn-circle"> */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            > */}
              {/* <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button> */}
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
             
              <div className="avatar">
                <div className="w-18 mask mask-squircle">
                  {/* <img src={currUser.username} /> */}
                </div>
              </div>
            </div>
          </button>
        </div>
      {/* </div> */}
    </>
  );
}