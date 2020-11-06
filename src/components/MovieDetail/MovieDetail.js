import React, { useEffect, useState } from 'react';
import './MovieDetail.scss'
import tmdb from '../../api/tmdb';
import {Link} from 'react-router-dom'
// import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import Layout from '../Layout/Layout';

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
      console.log(res)
      setDetail(res.data)
    }
    getDetail()
  }, [])

  const baseUrl = 'http://image.tmdb.org/t/p/w780';
  const backdropUrl = 'http://image.tmdb.org/t/p/original';

  const background = (backdrop) => {
    return {
      backgroundImage: `linear-gradient(to right, #000, transparent 50%, transparent), url(${backdropUrl}${backdrop})`
    }
  }

  const getReleasedYear = (releasedDate) => {
    return releasedDate.substr(0, 4);
  }

  if (!detail) return <></>;

  return (
    <Layout>
      <div className="movie-container">
        <span/>
        <div className="featured-wrapper" style={background(detail.backdrop_path)}></div>
        <div className="desc">
          <Link to={`/movie/${detail.id}`} className="link-title">
              <h1 className="title">{detail.title}</h1>
          </Link>
          <div className="info">
              {/* <Rating rate={this.props.movie.rate}/> */}
              <h5>{`${detail.vote_average} rating`}</h5>
              <h5>{`${detail.vote_count} reviews`}</h5>
              {/* <h5 className="duration">{movie.duration}</h5> */}
              <h5 className="year">{getReleasedYear(detail.release_date)}</h5>
          </div>
          <p>
              {detail.overview}
          </p>
          {/* {this.renderTrailerButton(this.props.onTrailerPress)} */}
        </div>
      </div>
      <div className="movie-info-container">
        <img src={`${baseUrl}${detail.poster_path}`} alt=""/>
        <div className="info-wrapper">

        </div>
      </div>
    </Layout>
  );
};

export default MovieDetail;