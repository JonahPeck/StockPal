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
     <title>StockPal/Login</title>
     <div className="web-app-emotion-cache-1wstayn">
  <div className="web-app-emotion-cache-eyq2zi">
    <div className="web-app-emotion-cache-17exwhe">
      <img aria-hidden="true"
           data-testid="default-image"
           sizes="(min-width: 768px) 1440px, 720px"
           src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/1e23d6b90f0d905b425ea289de345ab1.jpg"
           srcSet="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/1e23d6b90f0d905b425ea289de345ab1.jpg 720w, https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/632fcb3e7ed928b2a960f3e003d10b44.jpg 1440w"
           className="web-app-emotion-cache-1ox8jnp"
           style={{position: 'fixed', top: 0, left: 0, width: "50%", height: '100'}} />
    </div>
  </div>
</div>

      <div className="web-app-emotion-cache-1wstayn"></div>
        <div className="web-app-emotion-cache-5sconx"></div>
          <div className="web-app-emotion-cache-3a0nyr"></div>
          <div>
  <form className="web-app-emotion-cache-p9rxez">
    <header
      className="web-app-emotion-cache-52qs92"
      style={{
        position: 'fixed',
        top: '20%',
        right: '25%',
        fontFamily:'Arial',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        textShadow: '2px 2px #fff',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <span>Log in to StockPal</span>
    </header>
  </form>
</div>




      <div style={{position: 'fixed', top: '50%', right: '20%', transform: 'translateY(-50%)'}}>
      
      <form onSubmit={handleSubmitlogin} className="mb-4">
    <label className="block font-medium text-gray-700 mb-2" htmlFor="username">Username</label>
    <input
      className="border border-gray-400 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 w-full"
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <label className="block font-medium text-gray-700 mt-2 mb-2" htmlFor="password">Password</label>
    <input
      className="border border-gray-400 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 w-full"
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
<button className="bg-black text-white hover:bg-gray-900 font-bold py-3 px-6 rounded-lg mt-4" type="submit">Login</button>
  </form>

  <form onSubmit={handleSubmitnewuser} className="mb-4">
    <label className="block font-medium text-gray-700 mb-2" htmlFor="newusername">Username</label>
    <input
      className="border border-gray-400 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 w-full"
      type="text"
      id="newusername"
      value={newusername}
      onChange={(e) => setNewUsername(e.target.value)}
    />
    <label className="block font-medium text-gray-700 mt-2 mb-2" htmlFor="email">Email</label>
    <input
      className="border border-gray-400 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 w-full"
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <label className="block font-medium text-gray-700 mt-2 mb-2" htmlFor="newpassword">Password</label>
    <input
      className="border border-gray-400 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 w-full"
      type="password"
      id="newpassword"
      value={newpassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
<button className="bg-black text-white hover:bg-gray-900 font-bold py-3 px-6 rounded-lg mt-4" type="submit">Create Account</button>
  </form>


</div>

</>
)
}
