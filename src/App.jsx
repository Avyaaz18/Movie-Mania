import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import GetStarted from "./Pages/Default/index";
import Header from "./Components/header/header";
import Home from "./Pages/Home/home";
import Movie from './Pages/movieDetail/index';
import MovieList from './Components/movieList/index';
import TvShow from "./Pages/movieDetail/indexTv";

function App() {

  function Layout() {
    const location = useLocation();
    const shouldShowHeader = location.pathname !== '/';
  
    return (
      <>
        {shouldShowHeader && <Header />}
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search/:term" element={<MovieList/>} />
          <Route path="/movies" element={<MovieList type = "movie" />}/>
          <Route path="/tvshows" element = {<MovieList type = "tv" />}/>
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tvshow/:id" element={<TvShow />} />
          <Route path="/*" element={<h1>Error Page</h1>} />
        </Routes>
      </>
    );
  }
  return (
    <div className="App bg-gray-900">
      <Router>
        <Layout></Layout>
      </Router>
    </div>
  );
}

export default App;
