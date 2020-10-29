import React from 'react';
import {NavLink} from 'react-router-dom';
import {useAuth} from "../hooks/auth.hook";

export const Navbar = () =>{
  const {logout} = useAuth();

  const logoutHandler = event => {
    event.preventDefault();
    logout();
  }

  return (
    <nav>
      <div className="nav-wrapper green" style={{padding:'0 20px'}}>
        <a href="/" className="brand-logo">Документообіг</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/users">Користувачі</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Вийти</a></li>
        </ul>
      </div>
    </nav>
  )
}