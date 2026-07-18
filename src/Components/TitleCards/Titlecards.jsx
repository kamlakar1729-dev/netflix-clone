import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Titlecard.css'
import cards_data from '../../assets/cards/Cards_data'

const categoryTitles = {
  now_playing: 'Now Playing',
  popular: 'Popular Movies',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming',
}

const TitleCards = ({ title, category }) => {
  const cardListRef = useRef(null)
  const navigate = useNavigate()
  const [apiCards, setApiCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const scrollCards = (direction) => {
    if (!cardListRef.current) return

    const scrollAmount = cardListRef.current.clientWidth * 0.9
    cardListRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const movieCategory = category || 'now_playing'
  const sectionTitle = title || categoryTitles[movieCategory] || 'Movies'
  const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY || "a5cfad1462d2efe6879655da0520b41d"

  useEffect(() => {
    if (!tmdbApiKey) {
      setApiCards([])
      setIsLoading(false)
      setErrorMessage('TMDB API key is missing. Add VITE_TMDB_API_KEY to .env.local.')
      return
    }

    let ignoreResponse = false

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }

    const apiUrl = movieCategory === 'popular'
      ? 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
      : `https://api.themoviedb.org/3/movie/${movieCategory}?language=en-US&page=1`

    const requestUrl = new URL(apiUrl)
    requestUrl.searchParams.set('api_key', tmdbApiKey)
 
    setIsLoading(true)
    setErrorMessage('')

    fetch(requestUrl, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`TMDB request failed with status ${res.status}`)
        }

        return res.json()
      })
      .then((res) => {
        if (ignoreResponse) return

        const movies = Array.isArray(res.results) ? res.results : []

        if (movies.length === 0) {
          setErrorMessage('No movies found for this category.')
          setApiCards([])
          return
        }

        setApiCards(
          movies
            .filter((movie) => movie.backdrop_path || movie.poster_path)
            .map((movie) => ({
              id: movie.id,
              image: `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`,
              name: movie.title || movie.original_title || 'Untitled',
            })),
        )
      })
      .catch((error) => {
        if (!ignoreResponse) {
          setApiCards([])
          setErrorMessage(error.message || 'Unable to load TMDB movies.')
        }
      })
      .finally(() => {
        if (!ignoreResponse) setIsLoading(false)
      })

    return () => {
      ignoreResponse = true
    }
  }, [movieCategory, tmdbApiKey])

  const fallbackOffsets = {
    now_playing: 0,
    popular: 3,
    top_rated: 6,
    upcoming: 9,
  }
  const fallbackOffset = fallbackOffsets[movieCategory] || 0
  const fallbackCards = [
    ...cards_data.slice(fallbackOffset),
    ...cards_data.slice(0, fallbackOffset),
  ]
  const cardsToShow = apiCards.length > 0 ? apiCards : fallbackCards
  const preparedCards = cardsToShow.map((card, index) => ({
    ...card,
    id: card.id ?? 550 + index,
  }))

  return (
    <div className='title-cards'>
      <h2>{sectionTitle}</h2>
      <div className="card-row">
        <button
          className="scroll-btn scroll-btn-left"
          type="button"
          aria-label="Scroll cards left"
          onClick={() => scrollCards('left')}
        />
        <div className="card-list" ref={cardListRef}>
          {isLoading && <p className="cards-loading">Loading movies...</p>}
          {!isLoading && errorMessage && <p className="cards-loading">{errorMessage}</p>}
          {!isLoading && !errorMessage && preparedCards.map((card, index) => {
            const cardTitle = card.name || card.title || card.titleText || 'Untitled'
            const handleCardClick = () => {
              navigate(`/player/${card.id}`)
            }

            return (
              <div className="card" key={card.id || index} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <img src={card.image} alt={cardTitle} />
                <div className="card-popup">
                  <p>{cardTitle}</p>
                  <div className="card-actions">
                    <span>Play</span>
                    <span>More Info</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <button
          className="scroll-btn scroll-btn-right"
          type="button"
          aria-label="Scroll cards right"
          onClick={() => scrollCards('right')}
        />
      </div>
      
    </div>
  )
}

export default TitleCards
