import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'



export default function Home({currUser, setcurrUser, loggedIn}) {
  const router = useRouter()
  
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 

console.log(currUser,loggedIn)
  if(currUser && "username" in currUser){
    console.log("Pushing")
    router.push('/home')
    }
    
  function handleSubmitlogin(e) {
    console.log("submitting...")
    e.preventDefault();

    const data = {
      "username": username,
      "password": password,
      "email": email,
    }

    fetch("/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    .then(r => r.json())
    .then(user=>{setcurrUser(user)
    console.log(currUser,"inside1")}
    )
    .then(() => {
      console.log(currUser)
    })

    
  }
  function handleSubmitnewuser(e) {
    console.log("submitting...")
    e.preventDefault();
    const data = {
      "email": email,
      "username":newusername,
      "password": newpassword,
      

    }
    
    
    fetch("/new_account",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    .then(r => r.json())
    .then(user=>setUser(user))
    .then(() => {
      console.log(username, "in handle submit new")
      console.log("new guy on the block")
      fetch("/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    .then(r => r.json())
    .then(user=>{
      setcurrUser(user)
      setUser(user)
      console.log("1")
    })
    .then(() => {
      console.log("2")
      
      console.log("invalid login")
    })
      
      // handlelogin()

      
    })

    
  }
  
  function handleLogout(e) {
    e.preventDefault();
    fetch("/logout",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    setcurrUser(null)
    router.push('/')
  }


function PasswordInput() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-10"
        type={showPassword ? "text" : "password"}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          onClick={toggleShowPassword}
          className="cursor-pointer text-gray-400 hover:text-gray-500"
        />
      </div>
    </div>
  );
}

  
  // function checktype(e) {
  //   e.preventDefault();
  //   fetch("/get_type")
  //   .then(r => r.json())
  //   .then(data => console.log(data))
  // }

    
    return (
      <>
  <div className="container mx-auto">
    <form onSubmit={handleSubmitlogin} className="mb-8">
      <label className="block font-medium text-gray-700 mb-2" htmlFor="username">Username</label>
      <input
        className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="block font-medium text-gray-700 mt-4 mb-2" htmlFor="password">Password</label>
      <input
        className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">Login</button>
    </form>

    <form onSubmit={handleSubmitnewuser} className="mb-8">
      <label className="block font-medium text-gray-700 mb-2" htmlFor="newusername">Username</label>
      <input
        className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        type="text"
        id="newusername"
        value={newusername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <label className="block font-medium text-gray-700 mt-4 mb-2" htmlFor="email">Email</label>
      <input
        className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="block font-medium text-gray-700 mt-4 mb-2" htmlFor="newpassword">Password</label>
      <input
        className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        type="password"
        id="newpassword"
        value={newpassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">Create Account</button>
    </form>
  </div>
</>
    )
  }
