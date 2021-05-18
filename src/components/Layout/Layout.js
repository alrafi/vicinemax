import React, { useState, useEffect } from 'react'
import './Layout.scss'
import SideMenu from '../SideMenu/SideMenu'
import SearchBar from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import icon from '../../assets/img/icon.svg'

const Layout = ({ children, genres }) => {
  const [minHeight, setMinHeight] = useState(document.body.scrollHeight)

  useEffect(() => {
    const height = document.body.scrollHeight
    setMinHeight(`${height}px`)
  }, [document.body.scrollHeight])

  return (
    <div className="outer-container">
      <SideMenu genres={genres} />
      <div className="main-container" style={{ minHeight: minHeight }}>
        <div className="header-wrapper">
          <Link to="/" className="title-icon">
            <img src={icon} alt="Vicinemax" />
          </Link>
          <SearchBar />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout
