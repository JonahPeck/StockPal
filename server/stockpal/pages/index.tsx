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
      {/* <style data-emotion="css" data-s=""></style>
      <style data-emotion="web-app-emotion-cache-global" data-s=""></style>
      <style data-emotion="web-app-emotion-cache" data-s=""></style>
      <script type="text/javascript" crossorigin="anonymous" src="https://robinhood-api.arkoselabs.com/v2/7F867EDC-C71B-467F-B0A1-8DCBA5D4D2E3/api.js" data-callback="rhArkoseSetupEnforcement" async=""></script>
      <title>Log in | StockPal</title>
      <style>
      .r34K7X1zGgAi6DllVF3T{box-sizing:border-box;border:0;margin:0;padding:0;overflow:hidden;display:none;z-index:2147483647;pointer-events:none;visibility:hidden;opacity:0;transition:opacity 300ms linear;height:0;width:0}.r34K7X1zGgAi6DllVF3T.active{display:block;visibility:visible}.r34K7X1zGgAi6DllVF3T.active.show{opacity:1;pointer-events:inherit;position:inherit}.r34K7X1zGgAi6DllVF3T.active.show.in-situ{width:inherit;height:inherit}.r34K7X1zGgAi6DllVF3T.active.show.lightbox{position:fixed;width:100% !important;height:100% !important;top:0;right:0;bottom:0;left:0}@-moz-document url-prefix(''){.r34K7X1zGgAi6DllVF3T{visibility:visible;display:block}}

      </style> */}
      <div className="web-app-emotion-cache-1wstayn">
        <div className ="web-app-emotion-cache-eyq2zi">
          <div className="web-app-emotion-cache-17exwhe">
        
      <img aria-hidden="true" data-testid="default-image" sizes="(min-width: 768px) 1440px, 720px" src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/1e23d6b90f0d905b425ea289de345ab1.jpg" srcSet="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/1e23d6b90f0d905b425ea289de345ab1.jpg 720w, https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/632fcb3e7ed928b2a960f3e003d10b44.jpg 1440w" className="web-app-emotion-cache-1ox8jnp"></img>
      </div>
      </div>
      </div>
      <div className="web-app-emotion-cache-1wstayn"></div>
        <div className="web-app-emotion-cache-5sconx"></div>
          <div className="web-app-emotion-cache-3a0nyr"></div>
            <div>
              <form className ="web-app-emotion-cache-p9rxez">
                <header className = "web-app-emotion-cache-52qs92">
                  <span className ="css-z4smye">Log in to StockPal</span>
                </header>
                
              </form>
            </div>

      {/* <div className="web-app-emotion-cache-za6pwx"><div className="web-app-emotion-cache-5sconx"></div><div className="web-app-emotion-cache-3a0nyr"><div><form className="web-app-emotion-cache-p9rxez"><header className="web-app-emotion-cache-52qs92"><span className="css-z4smye">Log in to Robinhood</span></header><div className="web-app-emotion-cache-13dpkcn"><div className="web-app-emotion-cache-1rqauel"><label className="web-app-emotion-cache-1d3w5wq"><div className="web-app-emotion-cache-1te2hl9"><span className="css-y3z1hq">Email</span></div><div className="web-app-emotion-cache-b0hg9w"><input aria-describedby="" autocapitalize="off" autocomplete="username" autocorrect="off" name="username" required="" spellcheck="false" aria-invalid="false" class="remove-legacy web-app-emotion-cache-xvmyxk" type="text" value="PeckJonahC@gmail.com"></div></label></div><div className="web-app-emotion-cache-12bmans"><label className="web-app-emotion-cache-1d3w5wq"><div className="web-app-emotion-cache-1te2hl9"><span className="css-y3z1hq">Password</span></div><div className="web-app-emotion-cache-h5hqub"><input aria-describedby="" autocomplete="current-password" id="current-password" name="password" required="" aria-invalid="false" class="remove-legacy web-app-emotion-cache-49t5x1" type="password" value="Unicorn203"><button type="button" aria-label="show password in plain text" aria-pressed="false" aria-busy="false" class="web-app-emotion-cache-ztce21"><span class="web-app-emotion-cache-1c85bns"><span class="web-app-emotion-cache-kptemo"><span aria-hidden="true" class="web-app-emotion-cache-ck88l6"><svg fill="none" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M1 8s1.91-4.455 7-4.455S15 8 15 8s-1.91 4.454-7 4.454S1 8 1 8Zm4.773 0A2.23 2.23 0 0 0 8 10.227 2.23 2.23 0 0 0 10.227 8 2.23 2.23 0 0 0 8 5.773 2.23 2.23 0 0 0 5.773 8Z" fill="var(--rh__text-color)" fill-rule="evenodd"></path></svg></span></span></span></button></div></label></div><div><label class="web-app-emotion-cache-1h4maei"><div class="web-app-emotion-cache-dlww04"><div className="web-app-emotion-cache-1j26fl0"><input name="long_session" className="remove-legacy web-app-emotion-cache-14s5ose" type="checkbox"><div aria-hidden="true" data-testid="rh-Checkbox-visibleCheckbox" className="web-app-emotion-cache-1fruq8r"></div></div></div><span className="css-y3z1hq">Keep me logged in for up to 30 days</span></label></div><div className="web-app-emotion-cache-1ajn24b"><a role="link" className="rh-hyperlink web-app-emotion-cache-1xum9z6 css-1byi2su" rel="" href="/forgot_password"><span className="web-app-emotion-cache-1c85bns"><span className="web-app-emotion-cache-kptemo"><span className="web-app-emotion-cache-1xmir16 css-v72tci">Forgot your password?</span></span></span></a><a role="link" className="rh-hyperlink web-app-emotion-cache-1xum9z6 css-1byi2su" rel="" href="/contact?topic_id=2037&amp;skip_sign_in=true"><span className="web-app-emotion-cache-1c85bns"><span className="web-app-emotion-cache-kptemo"><span className="web-app-emotion-cache-1xmir16 css-v72tci">Forgot your email address?</span></span></span></a></div></div><footer className="web-app-emotion-cache-dwjtkn"><div id="submitbutton" className="web-app-emotion-cache-r8q1s1"><div className="web-app-emotion-cache-162tjk7"><button type="submit" aria-busy="false" className="web-app-emotion-cache-316ztu"><span className="web-app-emotion-cache-1c85bns"><span className="web-app-emotion-cache-kptemo"><span className="css-v72tci">Log In</span></span></span></button></div></div><div className="web-app-emotion-cache-11p3it6"><div className="web-app-emotion-cache-12y04o6"></div><span className="web-app-emotion-cache-ajlk3m css-10hobi0">or</span><div className="web-app-emotion-cache-12y04o6"></div></div><div id="submitbutton" className="web-app-emotion-cache-1sstyyn"><div className="web-app-emotion-cache-162tjk7"><button type="button" aria-busy="false" className="web-app-emotion-cache-316ztu"><span className="web-app-emotion-cache-1c85bns"><span className="web-app-emotion-cache-kptemo"><span aria-hidden="true" className="web-app-emotion-cache-11y9vmh"><svg fill="none" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M4.75 7.004h-1.5V14h9.5V7.004h-1.5V5.25a3.25 3.25 0 1 0-6.5 0v1.754Zm1.5 0h3.5V5.25a1.75 1.75 0 1 0-3.5 0v1.754Z" fill="var(--rh__text-color)" fill-rule="evenodd"></path></svg></span><span className="css-v72tci">Log in with passkeys</span></span></span></button></div></div><div className="web-app-emotion-cache-1hw29i9"><span className="css-y3z1hq">Not on Robinhood?</span> <a role="link" className="rh-hyperlink web-app-emotion-cache-12tif25 css-1byi2su" rel="" href="/signup"><span className="web-app-emotion-cache-1c85bns"><span className="web-app-emotion-cache-kptemo"><span className="web-app-emotion-cache-ksarv1 css-v72tci">Create an account</span></span></span></a></div></footer></form></div></div></div> */}
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
