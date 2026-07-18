import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'  
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from'../../assets/facebook_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
    <div className="footer-icon">
      <img src={facebook_icon} alt="" className="facebook-img"/>
      <img src={youtube_icon} alt="" className="youtube-img"/>
      <img src={instagram_icon} alt="" className="instagram-img"/>
      <img src={twitter_icon} alt="" className="twitter-img"/>

    </div>
    <ul>
      <li>Audio description</li>
      <li>Help Centre</li>
      <li>Gift Cards</li>
      <li>Media Centre</li>
      <li>Investor Relations</li>
      <li>Jobs</li>
      <li>Terms of use</li>
      <li>Privacy</li>
      <li>Legal Notices</li>
      <li>cookie preferences</li>
      <li>Corporate information</li>
      <li>Contact us</li>
      
    </ul>
    <p className='copyright-text'> @ 9908659267 netflix,inc </p>
      
    </div>
  )
}

export default Footer