import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'


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
  if(currUser){
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
      if(currUser){
      console.log("Pushing")
      router.push('/stocks')
      }else{
      console.log("invalid login")
    }
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
  
  // function checktype(e) {
  //   e.preventDefault();
  //   fetch("/get_type")
  //   .then(r => r.json())
  //   .then(data => console.log(data))
  // }

  if (currUser) {
    return (
    <>
    <h2>Welcome, {currUser.username}!</h2>
    <h2>Loading site</h2>
      
    </>
    );
  } else {
    
    return (
      <>
  {/* <Link as={`username/${'test'}`} href="/username/[something]">Link</Link> */}
  <form onSubmit={handleSubmitlogin}>
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        className="form-control text-black" 
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        className="form-control text-black"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button className="btn btn-primary" type="submit">Login</button>
  </form>

  <form onSubmit={handleSubmitnewuser}>
    <div className="form-group">
      <label htmlFor="newusername">Username</label>
      <input
        className="form-control text-black"
        type="text"
        id="newusername"
        value={newusername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
    </div>
    {/* <div className="form-group">
      <label htmlFor="name">Name</label>
      <input
        className="form-control text-black"
        type="text"
        id="name"
        value={username}
        onChange={(e) => setName(e.target.value)}
      />
    </div> */}
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        className="form-control bg-primary text-black"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="newpassword">Password</label>
      <input
        className="form-control text-black"
        type="password"
        id="newpassword"
        value={newpassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
    </div>
    <button className="btn btn-primary" type="submit">Create Account</button>
  </form>
</>
    )
  }}
