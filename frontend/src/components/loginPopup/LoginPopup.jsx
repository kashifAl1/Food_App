import React, { useContext, useState } from 'react'
import "./loginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

export default function LoginPopup({ setShowLogin }) {
   const { url, token, setToken } = useContext(StoreContext)
   const [currState, setCurrState] = useState("Login")
   const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
   });

   const onchangeHandler = (event) => {

      const name = event.target.name

      const value = event.target.value

      setData(data => ({ ...data, [name]: value }))

   }

   const onLogin = async (e) => {
      e.preventDefault()
      let newUrl = url;
      console.log(newUrl)
      if (currState === 'Login') {
         newUrl+='/api/user/login'
         console.log(newUrl,"login")
      } else {
         newUrl+='/api/user/register'
         console.log(newUrl,"register")
      }
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
         setToken(response.data.token)
         localStorage.setItem('token', response.data.token)
         setShowLogin(false)
      } else {
         alert(response.data.message)
      }
   }

// console.log("url",url)
   return (
      <div className='login-popup'>
         <form onSubmit={onLogin} className='login-popup-container'>
            <div className="loging-popup-title">
               <h2>{currState}</h2>
               <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
               {currState === "Login"
                  ? <></>
                  : <input type="text" placeholder='Your name' name='name' onChange={onchangeHandler} value={data.name} required />}
               <input type="email" placeholder='Your email' name='email' onChange={onchangeHandler} value={data.email} required />
               <input type="password" placeholder='Password' name='password' onChange={onchangeHandler} value={data.password} required />
            </div>
            <button type='submit'>{currState === "Sign UP" ? "Crete account" : "Login"}</button>
            <div className="login-popup-condition">
               <input type="checkbox" required />
               <p>By continuing i agree to the trems of  use & privacy policy.</p>
            </div>
            {currState === 'Login'
               ? <p>Create a new account? <span onClick={() => setCurrState('Sign UP')}>Click here</span> </p>
               : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span> </p>}
         </form>
      </div>
   )
}
