import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import './assets/styles/index.scss'
import MovieDetail from './components/MovieDetail/MovieDetail'
import SearchResult from './components/SearchResult/SearchResult'
import WatchLater from './components/WatchLater/WatchLater'
import NotFound from './components/NotFound/NotFound'
import ScrollToTop from './utils/ScrollToTop'

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/movie/watch-later" component={WatchLater} exact />
          <Route path="/movie/:id" component={MovieDetail} exact />
          <Route path="/search/:query" component={SearchResult} exact />
          <Route path="/" component={Home} exact />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
