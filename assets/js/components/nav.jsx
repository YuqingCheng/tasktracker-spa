import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import Login from './login.jsx';

// Layout design and some style attributes to Nat's microblog-spa example:
// https://github.com/NatTuck/microblog-spa

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <span className="navbar-brand">
          Tracker
        </span>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Tasks</NavLink>
          </NavItem>
        </ul>
        <CookiesProvider>
          <Login />
        </CookiesProvider>
      </nav>
    );
  }
}

export default connect((state) => state)((props) => (<NavBar />));