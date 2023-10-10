import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ManageCarsPage">Cars</Link>
        </li>
        <li>
          <Link to="/auth">Login/Register</Link>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
};

export default Navbar;