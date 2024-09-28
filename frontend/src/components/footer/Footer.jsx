import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

export const Footer = () => {
   return (
      <div className='footer' id='footer'>
         <div className="footer-content">
            <div className="footer-content-left">
               <img src={assets.logo} alt="" />
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quaerat suscipit magnam est, odio obcaecati distinctio iste deleniti nihil quisquam ipsum voluptate inventore reprehenderit ex dolores ipsa aut debitis eum?  </p>
               <div className="social-icons">
                  <img src={assets.facebook_icon} alt="" />
                  <img src={assets.twitter_icon} alt="" />
                  <img src={assets.linkedin_icon} alt="" />
               </div>
            </div>
            <div className="footer-content-center">
               <h2>COMPANY</h2>
               <ul>
                  <li>Home</li>
                  <li>About US</li>
                  <li>Delivry</li>
                  <li>Privacy policy </li>
               </ul>
            </div>
            <div className="footer-content-right">
               <h2>GET IN TOOUCH</h2>
               <ul>
                  <li> +92-308-3749149 </li>
                  <li> contact@tomato.com</li>
               </ul>
            </div>


         </div>
         < hr />
         <p className="footrr-copyright">
            Copyright 2024 &copy; Tomato.com - All Rights Reserved.
         </p>
      </div>
   )
}
