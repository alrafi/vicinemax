import React, { useState, useEffect } from 'react';
import './Layout.scss'
import SideMenu from '../SideMenu/SideMenu';
import iconSearch from '../../assets/img/icon-search.svg'

const Layout = ({children, genres}) => {
  const [minHeight, setMinHeight] = useState(document.body.scrollHeight)

  useEffect(() => {
    const height = document.body.scrollHeight
    setMinHeight(`${height}px`)
  }, [document.body.scrollHeight])

  return (
    <div className="outer-container">
      <SideMenu genres={genres} />
      <div className="main-container" style={{minHeight: minHeight}}>
        <div className="header-container">
          <form>
            <img src={iconSearch} alt="" className="filter-svg"/>
            <input type="text" placeholder="Search movie..."/>
          </form>
        </div>
        {children}
      </div>
    </div >
  );
};

export default Layout;
