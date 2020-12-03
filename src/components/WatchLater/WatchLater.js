import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'
import tmdb from '../../api/tmdb';

const WatchLater = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const listWatchLater = JSON.parse(localStorage.getItem("listWatchLater"))
    console.log(listWatchLater)
    if (listWatchLater) {
      setWatchLaterMovies(listWatchLater)
    }
  }, [])

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await tmdb.get('/genre/movie/list', {
          params: {
            language: 'en-US'
          }
        })
        setGenres(res.data.genres)
      } catch (err) {

      }
    }
    getGenres()
  }, [])

  const baseUrl = 'http://image.tmdb.org/t/p/w185';

  const getReleasedYear = (releasedDate) => {
    return releasedDate.substr(0, 4);
  }

  return (
    <Layout genres={genres}>
      <div className="popular-container">
        <h2>Watch Later</h2>
        <div className="movies-wrapper">
          {watchLaterMovies.map((movie) => {
            return (
              <div className="movie-item-container" key={`watch-later-${movie.id}`}>
                <Link to={`/movie/${movie.id}`} >
                  <img
                    className="movie-poster"
                    src={`${baseUrl}${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                  />
                  <p className="movie-title">{movie.title} ({getReleasedYear(movie.release_date)})</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default WatchLater;