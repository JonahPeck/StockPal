import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { use } from "react";
import { useState, useEffect } from "react";
import { cursorTo } from "readline";
import {parse} from "csv-parse";

const inter = Inter({ subsets: ["latin"] });

export default function App({stocks, currUser}) {
    const [newsList, setNewsList] = useState([]);
  
    useEffect(() => {
      const options = {
        headers: {
          'X-RapidAPI-Key': 'edb1bf48b1mshbd062dbf0793c2dp15ddf4jsndd1028a99649',
          'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
      };
      fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-newsfeed?category=generalnews&region=US&count=24`, options)
        .then(response => response.json())
        .then(info => {
          const newsList = [];
          for (let i = 0; i < 24; i++) {
            const item = info.items.result[i];
            const newsItem = {
              image: item.main_image.original_url,
              title: item.title,
              summary: item.summary,
              link: item.link
            };
            newsList.push(newsItem);
          }
          setNewsList(newsList);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    return (
        <>
        <title>News</title>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "3rem", fontWeight: "bold", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em" }}>Today's News</h1>
        <div className="news-container">
          {newsList.map((item, index) => (
            <div className="news-item" key={index}>
              <img src={item.image} alt="News" />
              <div className="news-content">
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <a href={item.link}>Read More</a>
              </div>
            </div>
          ))}
        </div>
        <style jsx>{`
          .news-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .news-item {
            width: 30%;
            margin-bottom: 2rem;
            border: 1px solid #dcdcdc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .news-item img {
            display: block;
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
          .news-content {
            padding: 1rem;
          }
          .news-content h2 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }
          .news-content p {
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 1rem;
          }
          .news-content a {
            display: inline-block;
            padding: 0.5rem 1rem;
            background-color: #0072c6;
            color: #fff;
            text-decoration: none;
            border-radius: 3px;
          }
        `}</style>
      </>
      
    );
  }