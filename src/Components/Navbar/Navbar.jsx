import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bell from '../../assets/bell_icon.svg'
import profile from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import {logout} from '../../firebase'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
       <img src={logo} alt="logo" className='logo' /> 
       <ul>
        <li>Home</li>
        <li>Tv Shows</li>
        <li>Movies</li>
        <li>New & Popular</li>
        <li>My List</li>
        <li>Browse by languages</li>
       </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="search" className='icons' />
        <p>Children</p>
        <img src={bell} alt="bell" className='icons' /> 
        <div className='navbar-profile'>
          <img src={profile} alt="profile" className='icons' />
          <img src={caret_icon} alt="caret_icon" className='icons' />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign out from Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
