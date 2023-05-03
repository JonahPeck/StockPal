import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { use } from "react";
import { useState } from "react";
import { cursorTo } from "readline";

const inter = Inter({ subsets: ["latin"] });

function hey({stock}){
  return (
    <>
    <div>Watchlist</div>
    </>
  )
}