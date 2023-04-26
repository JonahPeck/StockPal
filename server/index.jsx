import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'

export default function Home({currUser, setCurrUser, loggedIn})
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
      router.push('/home')
      }else{
      console.log("invalid login")
    }
    })

    
  }
  function handleSubmitnewuser(e) {
    console.log("submitting...")
    e.preventDefault();
    const data = {
      "name": name,
      "password": newpassword,
      "email": email,
      "username":newusername,
      "profile_picture":profilePicture,

    }
    
    
    fetch("/newuser",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    .then(r => r.json())
    .then(user=>setUser(user))
    .then(() => {
      console.log(user, "in handle submit new")
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
    <h2>Welcome, {currUser.name}!</h2>
    <h2>Loading site</h2>
      
    </>
    );
  } else {
    
    return (
      <>
      <Link as = {`user/${'test'}`} href="/user/[something]">Link</Link>
      <form onSubmit={handleSubmitlogin}>
        <p>Username</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>password</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <form onSubmit={handleSubmitnewuser}>
        <p>Username</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={newusername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <p>Name</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>email</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>password</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p>Profile Picture URL</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
      </>
    )
  }
