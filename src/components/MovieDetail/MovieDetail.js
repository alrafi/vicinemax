import React, { useEffect, useState } from 'react';
import './MovieDetail.scss'
import tmdb from '../../api/tmdb';
import { Link } from 'react-router-dom'
// import { css } from "@emotion/core";
// import BounceLoader from "react-spinners/BounceLoader";
import Layout from '../Layout/Layout';
import bgAlt from '../../assets/img/bg_alt.png'
import backdropAlt from '../../assets/img/backdrop_alt.jpg'

const MovieDetail = () => {
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    const path = window.location.pathname.split('/')
    const getDetail = async () => {
      const res = await tmdb.get(`/movie/${path[2]}`, {
        params: {
          append_to_response: 'external_ids,credits,videos,images'
        }
      })
      setDetail(res.data)
    }
    getDetail()
  }, [])

  const baseUrl = 'http://image.tmdb.org/t/p/w780';
  const backdropUrl = 'http://image.tmdb.org/t/p/original';

  const background = (backdrop) => {
    return {
      backgroundImage: `linear-gradient(to right, #000, transparent 50%, transparent), url(${backdrop ? `${backdropUrl}${backdrop}` : `${backdropAlt}`})`
    }
  }

  const getReleasedYear = (releasedDate) => {
    return releasedDate.substr(0, 4);
  }

  if (!detail) return <></>;

  return (
    <Layout>
      <div className="movie-container">
        <span />
        <div className="featured-wrapper" style={background(detail.backdrop_path)}></div>
        <div className="desc">
          <Link to={`/movie/${detail.id}`} className="link-title">
            <h1 className="title">{detail.title}</h1>
          </Link>
          <div className="info">
            <h5>{`${detail.vote_average} rating`}</h5>
            <h5>{`${detail.vote_count} reviews`}</h5>
            <h5 className="year">{getReleasedYear(detail.release_date)}</h5>
          </div>
          <p>
            {detail.overview}
          </p>
        </div>
      </div>
      <div className="movie-info-container">
        <img src={detail.poster_path ? `${baseUrl}${detail.poster_path}` : bgAlt} alt={detail.title} className="movie-detail-poster" />
        <div className="info-wrapper">
          <h1 className="movie-detail-title">{detail.title}</h1>
          <h2 className="movie-detail-tagline">{detail.tagline}</h2>
          <div className="movie-stats-wrapper">
            <p>{detail.vote_average}</p><span>|</span>
            <p>{detail.vote_count} Reviews</p><span>|</span>
            <p>{detail.runtime} min</p><span>|</span>
            <p>{getReleasedYear(detail.release_date)}</p>
            <p></p>
          </div>
          <p className="movie-detail-overview">{detail.overview}</p>
          {
            detail.genres.map(genre => {
              return (
                <p className="movie-detail-genre">{genre.name}<span>, </span></p>
              )
            })
          }
          <p className="movie-gallery-title">Galleries</p>

          {detail.images.backdrops.map((image, id) => {
            return (
              <img src={`${backdropUrl}${image.file_path}`} alt={`photos-${id}`} className='movie-detail-photo' loading="lazy" />
            )
          })}
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetail;