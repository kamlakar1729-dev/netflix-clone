import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import hero_banner from '../../Assets/hero_banner.jpg'
import hero_title from '../../Assets/hero_title.png'
import play_icon from '../../Assets/play_icon.png'
import info_icon from '../../Assets/info_icon.png'
import TitleCards from '../../Components/TitleCards/Titlecards'
import Footer from '../../Components/Footer/Footer'


const Home = () => {
  return (
    <div className='home'>
      <Navbar />
    <div className="hero">
    <img src={hero_banner} alt="hero banner" className='banner-img'/>
    <div className="hero-caption">
      <img src={hero_title} alt="hero title" className='caption-img'/>
      <p>
        Every great adventure begins with a single step into the unknown.This movie reminded me that the best stories are lived, not told."
      </p>
      <div className="hero-btns">
        <button className="btn"><img src={play_icon} alt="Play" />play</button>
        <button className="btn dark-btn"><img src={info_icon} alt="Info" />info</button>
      </div>
    </div>
    </div>
    <div className="home-cards-section">
      <TitleCards category="now_playing" />
      <div className="more-cards">
      <TitleCards category="popular"/>
      <TitleCards category="top_rated"/>
      <TitleCards category="upcoming"/>
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default Home
