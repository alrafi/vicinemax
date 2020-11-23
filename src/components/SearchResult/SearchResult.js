import React, {useState, useEffect} from 'react';
import Layout from '../Layout/Layout';
import tmdb from '../../api/tmdb'
import {Link} from 'react-router-dom'
import bgAlt from '../../assets/img/bg_alt.png'

const SearchResult = (props) => {
  const {match} = props
  console.log(props)
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
        console.log(res.data.results)
      } catch (err) {
        console.log(err);
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
        // console.log(res.data.genres)
        setGenres(res.data.genres)
      } catch (err) {

      }
    }
    getGenres()
  }, [])

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

  return (
    <Layout>
      <p>Search Results</p>
      <h1>{match.params.query}</h1>
      <div className="popular-container">
          <h2>Popular</h2>
          <div className="movies-wrapper">
            {dataSearch.map((movie) => {
              return (
                <div className="movie-item-container" key={movie.id}>
                  <Link to={`/movie/${movie.id}`} >
                    <img
                      className="movie-poster"
                      src={movie.poster_path ? `${baseUrl}${movie.poster_path}` : bgAlt}
                      alt={movie.title}
                      loading="lazy"
                    />
                    <p className="movie-title">{movie.title} {movie.release_date ? `(${(getReleasedYear(movie.release_date))})` : ""}</p>
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

export default SearchResult;