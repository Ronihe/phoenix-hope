import React, { Component } from 'react';
import { BrowserRouter as Link, Router, Route } from 'react-router-dom';
import './style.css';

export const Header = () => (
  <div className="Header">
    <Link to="/" className="Header-logo">
      Goal-Do-It
    </Link>
    <Link to="/login" className="Header-logo">
      Login
    </Link>
  </div>
);
