import React, {useState, useEffect} from 'react';
import tmdb from '../../api/tmdb'
import './SideMenu.scss'
import StickyBox from 'react-sticky-box';
import icon from '../../assets/img/icon.svg'
import iconGenre from '../../assets/img/icon-genre.svg'

const SideMenu = () => {
  const [genres, setGenres] = useState([])
  
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
  
  return (
    <StickyBox>
      <div className="side-container">
        <img src={icon} alt="Vicinemax" />
        <h1 className="app-title">Vicinemax</h1>
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
            {genres.map(genre => {
              return (
                <li key={genre.id}>
                  <img src={iconGenre} alt=""/>
                  {genre.name}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </StickyBox>
  );
};

export default SideMenu;