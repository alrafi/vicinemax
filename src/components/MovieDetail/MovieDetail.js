import React, {useEffect, useState} from 'react';
import tmdb from '../../api/tmdb';

const MovieDetail = () => {
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    const path = window.location.pathname.split('/')
    const getDetail = async () => {
      const res = await tmdb.get(`/movie/${path[2]}`)
      console.log(res)
      setDetail(res.data)
    }
    getDetail()
  }, [])

  const baseUrl = 'http://image.tmdb.org/t/p/w185';

  if (!detail) return <p>Loading...</p>;

  return (
    <div>
      <img src={`${baseUrl}${detail.poster_path}`} alt=""/>
      <h1>{detail.title}</h1>
      <p>{detail.overview}</p>
    </div>
  );
};

export default MovieDetail;