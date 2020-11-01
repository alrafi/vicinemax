import React, { useState, useEffect } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import tmdb from '../../api/tmdb';
import icon from '../../assets/img/icon.svg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      const res = await tmdb.get('/movie/popular', {
        params: {
          language: 'en-US',
        },
      });
      setMovies(res.data.results);
      // console.log(res.data.results);
      getRandom(res.data.results)
    };
    getMovies();
  }, []);

  const baseUrl = 'http://image.tmdb.org/t/p/w185';
  const backdropUrl = 'http://image.tmdb.org/t/p/w780';

  const getRandom = (allMovies) => {
    const movies = [...allMovies]
    let random = movies.sort(() => .5 - Math.random()).slice(0, 4)
    setFeaturedMovies(random);
  }

  return (
    <div className="outer-container">
      <StickyBox>
        <div className="side-container">
          <img src={icon} alt="Vicinemax" />
          <div className="main-menu-wrapper">
            <ul>
              <li>Home</li>
              <li>Watch Later</li>
              <li>Favorite</li>
              <li>Popular</li>
              <li>New Release</li>
            </ul>
          </div>
          <div className="genre-menu-wrapper">
            <p>Genre</p>
            <ul>
              <li>Action</li>
              <li>Biography</li>
              <li>Comedy</li>
              <li>Fiction</li>
              <li>Horror</li>
              <li>Mystery</li>
              <li>Romance</li>
              <li>Thriller</li>
            </ul>
          </div>
        </div>
      </StickyBox>
      <div className="main-container">
        <div className="header-container"></div>
        <div className="featured-container">
          <h2>For You</h2>
          <Carousel>
            {
              featuredMovies.map(movie => {
                return (
                  <div className="featured-wrapper">
                    <img src={`${backdropUrl}${movie.backdrop_path}`} alt={movie.id} />
                  </div>
                )
              })
            }
          </Carousel>

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
