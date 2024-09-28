import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
export default function Navbar() {
  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo' alt="logo" />
      <img src={assets.profile_image} alt="profile" className='profile' />
    </div>
  )
}
