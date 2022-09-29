import React from 'react'
import logo from "../../logo.png"
import { Link } from 'react-router-dom';
import {ImSearch} from "react-icons/im";

const Header = () => {
    // console.log(logo);
  return (
    <nav className="header">
        <img src={logo} alt="logo" />

      <div>
        <Link to={"/tvshows"}>TV shows</Link>
        <Link to={"/movies"}>Movies</Link>
        <Link to={"/recentlyadded"}>Recently Added</Link>
        <Link to={"/tvshowsmylist"}>My List</Link>
      </div>

      <ImSearch/>

    </nav>
  )
}

export default Header