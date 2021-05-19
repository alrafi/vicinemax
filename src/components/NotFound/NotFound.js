import React from 'react';
import Layout from '../Layout/Layout'
import './NotFound.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Layout>
      <div className="not-found">
        <h2>Sorry, page not found</h2>
        <Link to='/'>Back to home</Link>
      </div>
    </Layout>
  );
};

export default NotFound;