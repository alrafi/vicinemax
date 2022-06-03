import React, { useEffect, useState } from "react";
import "./MovieDetail.scss";
import tmdb from "../../api/tmdb";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import bgAlt from "../../assets/img/bg_alt.png";
import backdropAlt from "../../assets/img/backdrop_alt.jpg";
import { Helmet } from "react-helmet";
import GridLoader from "react-spinners/GridLoader";

const MovieDetail = () => {
  const [detail, setDetail] = useState(null);
  const [addedWatchLater, setAddedWatchLater] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    const getDetail = async () => {
      const res = await tmdb.get(`/movie/${path[2]}`, {
        params: {
          append_to_response: "external_ids,credits,videos,images",
        },
      });
      setDetail(res.data);
    };
    getDetail();
  }, []);

  const baseUrl = "http://image.tmdb.org/t/p/w780";
  const backdropUrl = "http://image.tmdb.org/t/p/original";

  const background = (backdrop) => {
    return {
      backgroundImage: `linear-gradient(to right, #000, transparent 50%, transparent), url(${
        backdrop ? `${backdropUrl}${backdrop}` : `${backdropAlt}`
      })`,
    };
  };

  const getReleasedYear = (releasedDate) => {
    return releasedDate.substr(0, 4);
  };

  useEffect(() => {
    const getWatchLater = async () => {
      const listWatchLater = await JSON.parse(
        localStorage.getItem("listWatchLater")
      );
      if (listWatchLater) {
        if (detail) {
          const find = listWatchLater.findIndex((el) => el.id === detail.id);
          setAddedWatchLater(find !== -1 ? true : false);
        }
      }
    };
    getWatchLater();
  }, [detail]);

  const addToWatchLater = () => {
    const listWatchLater = JSON.parse(localStorage.getItem("listWatchLater"));
    let listToBeAdded = [];
    if (addedWatchLater) {
      const list = listWatchLater.filter((item) => item.id !== detail.id);
      listToBeAdded = [...list];
      setAddedWatchLater(false);
    } else {
      if (!listWatchLater) {
        listToBeAdded = [detail];
      } else {
        listToBeAdded = [...listWatchLater, detail];
      }
      setAddedWatchLater(true);
    }
    localStorage.setItem("listWatchLater", JSON.stringify(listToBeAdded));
  };

  if (!detail) return <></>;

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{detail.title} | Vicinemax</title>
        <meta
          name="description"
          content="Vicinemax is a movie library that provide detail info about movies"
        />
      </Helmet>
      {!detail ? (
        <div className="home-wrapper">
          <GridLoader color="#08919a" size={24} />
        </div>
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{detail.title} | Vicinemax</title>
            <meta name="description" content={detail.overview} />
          </Helmet>
          <div className="movie-container">
            <span />
            <div
              className="featured-wrapper"
              style={background(detail.backdrop_path)}
            ></div>
            <div className="desc">
              <Link to={`/movie/${detail.id}`} className="link-title">
                <h1 className="title">{detail.title}</h1>
              </Link>
              <div className="info">
                <h5>{`${detail.vote_average} Rating`}</h5>
                <h5>{`${detail.vote_count} Reviews`}</h5>
                <h5 className="year">{getReleasedYear(detail.release_date)}</h5>
              </div>
              <p>{detail.overview}</p>
            </div>
          </div>
          <div className="movie-info-container">
            <img
              src={
                detail.poster_path ? `${baseUrl}${detail.poster_path}` : bgAlt
              }
              alt={detail.title}
              className="movie-detail-poster"
            />
            <div className="info-wrapper">
              <h1 className="movie-detail-title">{detail.title}</h1>
              <h2 className="movie-detail-tagline">{detail.tagline}</h2>
              <div className="movie-stats-wrapper">
                <p>{detail.vote_average}</p>
                <span>|</span>
                <p>{detail.vote_count} Reviews</p>
                <span>|</span>
                <p>{detail.runtime} min</p>
                <span>|</span>
                <p>{getReleasedYear(detail.release_date)}</p>
              </div>
              <p className="detail-title">Storyline</p>
              <p className="movie-detail-overview">{detail.overview}</p>
              <p className="detail-title">Genres</p>
              {detail.genres.map((genre, id) => {
                return (
                  <p className="movie-detail-genre" key={`genre-${id}`}>
                    {genre.name}
                    <span>, </span>
                  </p>
                );
              })}
              <button
                onClick={addToWatchLater}
                className={`watch-later ${
                  addedWatchLater ? "added-watch-later" : ""
                }`}
              >
                {addedWatchLater ? "Added to Watch Later" : "Watch Later"}
              </button>
            </div>
          </div>
          <div className="galleries">
            <p className="movie-gallery-title">Galleries</p>

            {detail.images.backdrops.map((image, id) => {
              return (
                <img
                  src={`${backdropUrl}${image.file_path}`}
                  alt={`photos-${id}`}
                  key={`photos-${id}`}
                  className="movie-detail-photo"
                  loading="lazy"
                />
              );
            })}
          </div>
        </>
      )}
    </Layout>
  );
};

export default MovieDetail;
