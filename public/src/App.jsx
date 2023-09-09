import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Netflix from './pages/Netflix';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Player from './components/Player';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import MyList from './pages/MyList';

console.log(1);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/mylist" element={<MyList />} />
        <Route exact path="/" element={<Netflix />} />
      </Routes>
    </Router>
  );
}
