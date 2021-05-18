import React, { useState, useEffect } from 'react'
import tmdb from '../../api/tmdb'
import './SideMenu.scss'
import StickyBox from 'react-sticky-box'
import icon from '../../assets/img/icon.svg'
import iconGenre from '../../assets/img/icon-genre.svg'
import { Link } from 'react-router-dom'

const SideMenu = () => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await tmdb.get('/genre/movie/list', {
          params: {
            language: 'en-US',
          },
        })
        setGenres(res.data.genres)
      } catch (err) {}
    }
    getGenres()
  }, [])

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
              <li>Home</li>
            </Link>
            <Link to="/movie/watch-later">
              <li>Watch Later</li>
            </Link>
            <li>Favorite</li>
            <li>Popular</li>
            <li>New Release</li>
          </ul>
        </div>
        <div className="genre-menu-wrapper">
          <p>Genre</p>
          <ul>
            {genres.map((genre) => {
              return (
                <li key={genre.id}>
                  <img src={iconGenre} alt="" />
                  {genre.name}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </StickyBox>
  )
}

export default SideMenu
