import React, { useState, useEffect } from 'react';
import './Home.scss';
import {Link} from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import tmdb from '../../api/tmdb';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const res = await tmdb.get('/movie/popular', {
        params: {
          language: 'en-US',
        },
      });
      setMovies(res.data.results);
      console.log(res.data.results);
    };
    getMovies();
  }, []);

  const baseUrl = 'http://image.tmdb.org/t/p/w185';

  return (
    <div className="outer-container">
      <StickyBox>
        <div className="side-container">
          <h1>sidemenu</h1>
          <h1>sidemenu</h1>
          <h1>sidemenu</h1>
          <h1>sidemenu</h1>
          <h1>sidemenu</h1>
        </div>
      </StickyBox>
      <div className="main-container">
        <div className="header-container"></div>
        <div className="featured-container">
          <h2>For You</h2>
        </div>
        <div className="popular-container">
          <h2>Popular</h2>
          <div className="movies-wrapper">
            {movies.map((movie) => {
              return (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <div className="movie-item-container" >
                    <img
                      className="movie-poster"
                      src={`${baseUrl}${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                    />
                    <p className="movie-title">{movie.title} (2020)</p>
                    <p className="movie-genres">Mystery</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
