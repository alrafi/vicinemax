import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import "./assets/styles/index.scss";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import SearchResult from "./components/SearchResult/SearchResult";
import WatchLater from "./components/WatchLater/WatchLater";
import TopRated from "./components/TopRated/TopRated";
import GenreMovies from "./components/GenreMovies/GenreMovies";
import NotFound from "./components/NotFound/NotFound";
import NowPlaying from "./components/NowPlaying/NowPlaying";
import Upcoming from "./components/Upcoming/Upcoming";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/watch-later" component={WatchLater} exact />
          <Route path="/movie/:id" component={MovieDetail} exact />
          <Route path="/top-rated" component={TopRated} exact />
          <Route path="/search/:query" component={SearchResult} exact />
          <Route path="/genres/:genreId" component={GenreMovies} exact />
          <Route path="/now-playing" component={NowPlaying} exact />
          <Route path="/upcoming" component={Upcoming} exact />
          <Route path="/" component={Home} exact />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
