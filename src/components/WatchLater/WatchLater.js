import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'
import tmdb from '../../api/tmdb';
import { Helmet } from "react-helmet";

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Watch Later | Vicinemax</title>
        <meta name="description" content="Vicinemax is a movie library that provide detail info about movies" />
      </Helmet>
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
                  <div className="title-wrapper">
                    <p className="movie-title">
                      {movie.title} ({getReleasedYear(movie.release_date)})
                    </p>
                  </div>
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