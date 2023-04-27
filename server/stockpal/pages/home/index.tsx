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

export async function getServerSideProps() {
    return (
        <h1>Hey welcome home</h1>
    )
}