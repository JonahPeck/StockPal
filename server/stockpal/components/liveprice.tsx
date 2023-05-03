import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import StockList from '../pages/StockList'
import {useState, useEffect} from 'react'

export default function Price({symbol}) {
    const [price, setPrice] = useState(null)
    const [open, setOpen] = useState(null)
    const [high, setHigh] = useState(null)
    const [low, setLow] = useState(null)
    const [volume, setVolume] = useState(null)
    const [datetime, setDate] = useState(null)
    const [close, setClose] = useState(null)

    function StockCard({stock}){
        const [watchlist, setWatchlist] = useState([]);

        const addToWatchList = (stock) => {
            setWatchlist([...watchlist,stock])
        };
        function handleAddToWatchlist(e) {
            e.preventDefault();
            fetch("/watchlist", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }
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
      }, [symbol]);
        
    
        // fetch(`https://twelve-data1.p.rapidapi.com/time_series?symbol=${symbol}&interval=1min&outputsize=30&format=json`, options)
        //   .then(response => response.json())
        //   .then(data => {

    // const url = 'https://twelve-data1.p.rapidapi.com/time_series?symbol=AMZN&interval=1min&outputsize=30&format=json';
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
            console.log(datetime)
            setClose(data.values[0].close);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [symbol]);
    
      return (
        <div>
        {open !== null && (
          <div className="card w-96 bg-white shadow-md rounded-lg p-4">
            <div className="card-body flex flex-col items-center">
              <h2 className="card-title text-2xl font-bold mb-6">Live Numbers</h2>
              <p className="mb-4">Wall Street: {datetime}</p>
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
              <button onClick={() => handleAddToWatchlist(stock)} className="btn btn-success btn-primary=#7CFC00" style={{ borderColor: '#7CFC00', color: '#7CFC00' }}>Add To Watchlist</button>
              </div>
            </div>
          </div>
        )}
      </div>
      )
       
    }

    