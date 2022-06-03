import React, { useState, useEffect } from "react";
import tmdb from "../../api/tmdb";
import "./SideMenu.scss";
import StickyBox from "react-sticky-box";
import icon from "../../assets/img/icon.svg";
import iconGenre from "../../assets/img/icon-genre.svg";
import { Link } from "react-router-dom";

const SideMenu = ({ param }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await tmdb.get("/genre/movie/list", {
          params: {
            language: "en-US",
          },
        });
        setGenres(res.data.genres);
      } catch (err) {}
    };
    getGenres();
  }, []);

  return (
    <StickyBox>
      <div className="side-container">
        <Link to="/" className="title-icon">
          <img src={icon} alt="Vicinemax" />
          <h1 className="app-title">Vicinemax</h1>
        </Link>
        <div className="main-menu-wrapper">
          <ul>
            <Link to="/">
              <li className={param === "/" ? "active" : ""}>Home</li>
            </Link>
            <Link to="/watch-later">
              <li className={param === "/watch-later" ? "active" : ""}>
                Watch Later
              </li>
            </Link>
            <Link to="/top-rated">
              <li className={param === "/top-rated" ? "active" : ""}>
                Top Rated
              </li>
            </Link>
            <Link to="/now-playing">
              <li>Now Playing</li>
            </Link>
            <Link to="/upcoming">
              <li>Upcoming</li>
            </Link>
          </ul>
        </div>
        <div className="genre-menu-wrapper">
          <p>Genre</p>
          <ul>
            {genres.map((genre) => {
              return (
                <Link to={`/genres/${genre.id}`} key={genre.id}>
                  <li
                    className={param === `/genres/${genre.id}` ? "active" : ""}
                  >
                    <img src={iconGenre} alt="" />
                    {genre.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </StickyBox>
  );
};

export default SideMenu;
