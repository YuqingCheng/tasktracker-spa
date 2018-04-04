import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import TaskList from './components/tasklist.jsx';
import TaskForm from './components/taskform.jsx';

import Nav from './components/nav.jsx';

export default function tasktracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <App state={store.getState()} />
      </CookiesProvider>
    </Provider>,
    document.getElementById('root')
  );
}

// Layout design and some style attributes to Nat's microblog-spa example:
// https://github.com/NatTuck/microblog-spa

class Tasktracker extends React.Component {
  componentWillMount() {
    let token = this.props.cookies.get('token');

    this.props.dispatch({
      type: "SET_TOKEN",
      token: token
    });
  }

  render() {
    return (
      <Router path="/">
        <div>
          <Nav />
          <Switch>
            <Route path="/taskform/:task_id" render={() => (<TaskForm/>)} />
            <Route path="/taskform" render={() => (<TaskForm/>)} />
            <Route path="/" render={() => (<TaskList/>)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

let App = withCookies(connect((state) => state)(Tasktracker));