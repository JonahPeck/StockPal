import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import StockList from '../pages/StockList'
import {useState, useEffect} from 'react'

export default function Price({symbol, stock}) {
    const [stock_id, setStock_id] = useState(null)
    const [user_id, setUser_id] = useState(null)
    const [price, setPrice] = useState(null)
    const [open, setOpen] = useState(null)
    const [high, setHigh] = useState(null)
    const [low, setLow] = useState(null)
    const [volume, setVolume] = useState(null)
    const [datetime, setDate] = useState(null)
    const [close, setClose] = useState(null)
    const [watchlist, setWatchlist] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [url,setUrl] = useState("")
    
    const addToWatchList = (stock) => {
        setWatchlist([...watchlist,stock])
    };
    function StockCard({stock}){

    }
    function handleAddToWatchlist(e) {
      // e.preventDefault();
        const data = {
          "stock_id": stock.id,
          // "user_id": user_id,
  
        };// e.preventDefault();
        console.log("adding to watchlist")
        console.log(stock)
        fetch("/watchlist2",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      .then(response => response.json())
      .then(data => {
        console.log("Response from server:", data);
        
      })
    }

    

    const STOCK_URL = "https://twelve-data1.p.rapidapi.com/stocks?symbol=MSFT&format=json"
    const RAPID_API_KEY = "edb1bf48b1mshbd062dbf0793c2dp15ddf4jsndd1028a99649"

    useEffect(() => {
        const options = {
          headers: {
            'X-RapidAPI-Key': 'edb1bf48b1mshbd062dbf0793c2dp15ddf4jsndd1028a99649',
            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
          }
        };
        fetch(`https://twelve-data1.p.rapidapi.com/price?symbol=${symbol}&format=json&outputsize=30`, options)
          .then(response => response.json())
          .then(data => {
            setPrice(data.price)
            console.log(data.price)
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [symbol, refresh]);

      useEffect(() => {
        const options = {
          headers: {
            'X-RapidAPI-Key': 'edb1bf48b1mshbd062dbf0793c2dp15ddf4jsndd1028a99649',
            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
          }
        };
        fetch(`https://twelve-data1.p.rapidapi.com/logo?symbol=${symbol}`, options)
          .then(response => response.json())
          .then(logo => {
            setUrl(logo.url)
            console.log(logo.url)
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
      
        
    
    useEffect(() => {
        const options = {
          headers: {
            'X-RapidAPI-Key': 'edb1bf48b1mshbd062dbf0793c2dp15ddf4jsndd1028a99649',
            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
          }
        };
    
        fetch(`https://twelve-data1.p.rapidapi.com/time_series?symbol=${symbol}&interval=1min&outputsize=30&format=json`, options)
          .then(response => response.json())
          .then(data => {
            setOpen(data.values[0].open)
            setHigh(data.values[0].high);
            setLow(data.values[0].low);
            setVolume(data.values[0].volume);
            setDate(data.values[0].datetime);
            setClose(data.values[0].close);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [symbol, refresh]);
      const handleRefresh = () => {
        setRefresh(!refresh);
      };
    
      return (
        <div>
        {open !== null && (
          <div className="card w-96 bg-white shadow-md rounded-lg p-4">
            <div className="card-body flex flex-col items-center">
              <h2 className="card-title text-2xl font-bold mb-6">Live Numbers</h2>
              <button onClick={handleRefresh} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
  Get Live Prices
</button>
              <p className="mb-4">Wall Street: {datetime}</p>
              <img src={url} alt="image"></img>
              {/* <h3>Company Description: {blurb}</h3> */}
              {/* <p>{chart} Chart here</p> */}
              <div className="grid grid-cols-2 gap-4 mb-4 w-full">
                <div className="text-center border-r-2">
                  <p className="text-lg font-bold">Daily Open</p>
                  <p className="text-2xl">${open}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">Current Price</p>
                  <p className="text-2xl">${price}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 w-full">
                <div className="text-center border-r-2">
                  <p className="text-lg font-bold">Today's High</p>
                  <p className="text-2xl">${high}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">Today's Low</p>
                  <p className="text-2xl">${low}</p>
                </div>
              </div>
              <p className="mb-4">Volume Traded: {volume}</p>
              <p className="mb-4">Daily Close: {close}</p>
              <div className="flex justify-center mt-6">
              <button 
  onClick={(e) => handleAddToWatchlist(e)}
  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"

>
  Add To Watchlist
</button>
              </div>
            </div>
          </div>
        )}
      </div>
      )
    }

    