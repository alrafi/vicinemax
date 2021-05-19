import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import tmdb from '../../api/tmdb'
import { Link } from 'react-router-dom'
import bgAlt from '../../assets/img/bg_alt.png'
import { Helmet } from "react-helmet";
import './SearchResult.scss'

const SearchResult = (props) => {
  const { match } = props
  const [dataSearch, setDataSearch] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await tmdb.get('/search/movie', {
          params: {
            query: match.params.query,
          },
        });
        setDataSearch(res.data.results);
      } catch (err) {
        return;
      }

    };
    getMovies();
  }, [match.params.query])

  const baseUrl = 'http://image.tmdb.org/t/p/w185';

  const getReleasedYear = (releasedDate) => {
    return releasedDate.substr(0, 4);
  }

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

  const getMovieGenre = (genreIDs) => {
    let arr = []
    if (genres.length <= 0) return arr;

    genreIDs.forEach(item => {
      const genreItem = genres.filter(genre => genre.id === item)
      arr.push(genreItem[0])
    })
    return arr;
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Vicinemax | Movie Library</title>
        <meta name="description" content="Vicinemax is a movie library that provide detail info about movies" />
      </Helmet>
      <p>Search Results</p>
      <h1>{match.params.query}</h1>
      <div className="popular-container">
        <div className="movies-wrapper">
          {
            dataSearch.length > 0 ?
              dataSearch.map((movie) => {
                return (
                  <div className="movie-item-container" key={movie.id}>
                    <Link to={`/movie/${movie.id}`} >
                      <img
                        className="movie-poster"
                        src={movie.poster_path ? `${baseUrl}${movie.poster_path}` : bgAlt}
                        alt={movie.title}
                        loading="lazy"
                      />
                      <div className="title-wrapper">
                        <p className="movie-title">
                          {movie.title} ({getReleasedYear(movie.release_date)})
                    </p>
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
                    </Link>

                  </div>
                );
              })
              :
              <div className="no-movies">
                <h2>No movies found</h2>
                <Link to="/">Back to Home</Link>
              </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default SearchResult;