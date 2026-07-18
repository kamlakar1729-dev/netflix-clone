import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Player.css";
import back_icon from "../../assets/back_arrow_icon.png";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    key: "",
    name: "",
    published_at: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY || "a5cfad1462d2efe6879655da0520b41d";
  const movieId = id || 550; // Default to Fight Club if no ID provided

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${tmdbApiKey}`
        );

        if (!movieResponse.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const movieData = await movieResponse.json();

        // Fetch trailer for this movie
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${tmdbApiKey}`
        );

        if (!videoResponse.ok) {
          throw new Error("Failed to fetch trailer");
        }

        const videoData = await videoResponse.json();

        // Find YouTube trailer
        const trailer = videoData.results.find(
          (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
        ) || videoData.results[0];

        if (trailer) {
          setApiData({
            key: trailer.key,
            name: movieData.title || "Movie",
            published_at: movieData.release_date || "",
            type: trailer.type || "Trailer",
          });
        } else {
          setError("No trailer found for this movie");
        }
      } catch (error) {
        setError(error.message || "Failed to load trailer");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId, tmdbApiKey]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="player">
      <button className="back-btn" onClick={handleBack} aria-label="Go back">
        <img src={back_icon} alt="Back" />
      </button>

      <div className="player-wrapper">
        {loading && <p className="loading-placeholder">Loading trailer...</p>}
        {!loading && error && <p className="player-error">{error}</p>}
        {!loading && !error && apiData.key && (
          <iframe
            className="player-frame"
            src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1&mute=1&playsinline=1`}
            title={apiData.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div className="player-info">
        <p className="meta">Release Date: {apiData.published_at}</p>
        <p className="title">{apiData.name}</p>
        <p className="type">{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;