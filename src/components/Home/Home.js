import React, { useState, useEffect } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import tmdb from '../../api/tmdb';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Layout from '../Layout/Layout'

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await tmdb.get('/movie/popular', {
          params: {
            language: 'en-US',
          },
        });
        setMovies(res.data.results);
        getRandom(res.data.results)
      } catch (err) {
        console.log(err);
        return;
      }

    };
    getMovies();
  }, []);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await tmdb.get('/genre/movie/list', {
          params: {
            language: 'en-US'
          }
        })
        // console.log(res.data.genres)
        setGenres(res.data.genres)
      } catch (err) {

      }
    }
    getGenres()
  }, [])

  const baseUrl = 'http://image.tmdb.org/t/p/w185';
  const backdropUrl = 'http://image.tmdb.org/t/p/original';

  const getRandom = (allMovies) => {
    const movies = [...allMovies]
    let random = movies.sort(() => .5 - Math.random()).slice(0, 4)
    console.log(random)
    setFeaturedMovies(random);
  }

  const getReleasedYear = (releasedDate) => {
    return releasedDate.substr(0, 4);
  }

  const getMovieGenre = (genreIDs) => {
    // console.log(genreIDs)
    let arr = []
    if (genres.length <= 0) return arr;

    genreIDs.forEach(item => {
      const genreItem = genres.filter(genre => genre.id === item)
      arr.push(genreItem[0])
    })
    // console.log(arr)
    return arr;
  }

  const background = (backdrop) => {
    return {
      backgroundImage: `linear-gradient(to right, #000, transparent 50%, transparent), url(${backdropUrl}${backdrop})`
    }
  }

  if (!movies || !genres) return <h1>Loading</h1>

  return (
    <Layout genres={genres}>
      <div className="featured-container">
        <h2>For You</h2>
        <Carousel showThumbs={false}>
          {
            featuredMovies.map(movie => {
              return (
                <React.Fragment key={movie.id}>
                  <span/>
                  <div className="featured-wrapper" style={background(movie.backdrop_path)}></div>
                  <div className="desc">
                    <Link to={`/movie/${movie.id}`} className="link-title">
                        <h1 className="title">{movie.title}</h1>
                    </Link>
                    <div className="info">
                        {/* <Rating rate={this.props.movie.rate}/> */}
                        <h5>{`${movie.vote_average} rating`}</h5>
                        <h5>{`${movie.vote_count} reviews`}</h5>
                        {/* <h5 className="duration">{movie.duration}</h5> */}
                        <h5 className="year">{getReleasedYear(movie.release_date)}</h5>
                    </div>
                    <p>
                        {movie.overview}
                    </p>
                    {/* {this.renderTrailerButton(this.props.onTrailerPress)} */}
                  </div>
                </React.Fragment>
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
                <div className="movie-item-container" key={movie.id}>
                  <Link to={`/movie/${movie.id}`} >
                    <img
                      className="movie-poster"
                      src={`${baseUrl}${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                    />
                    <p className="movie-title">{movie.title} ({getReleasedYear(movie.release_date)})</p>
                  </Link>
                  <div className="genre-wrapper">
                    {
                      getMovieGenre(movie.genre_ids).map(item => {
                        return (<p className="movie-genres" key={`${movie.id}-${item.id}`}>
                          {item.name}<span>, </span>
                        </p>
                        )
                      })
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </Layout>
  );
};

export default Home;
