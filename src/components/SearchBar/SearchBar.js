import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import iconSearch from '../../assets/img/icon-search.svg'

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const history = useHistory()

  const onSearch = (e) => {
    setQuery(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    history.push(`/search/${query}`)
  }

  return (
    <div className="header-container">
      <form onSubmit={onSubmit}>
        <img src={iconSearch} alt="" className="filter-svg" />
        <input type="text" placeholder="Search movie..." value={query} onChange={onSearch} />
      </form>
    </div>
  );
};

export default SearchBar;