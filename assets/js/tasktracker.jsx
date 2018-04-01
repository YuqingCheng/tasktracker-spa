import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

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
      <Router>
        <div>
          <Nav />
          <Route path="/" exact={true} render={() => {
            return (<div>
                      <p>TODO</p>
                    </div>);
          }} />
        </div>
      </Router>
    );
  }
}

let App = withCookies(connect((state) => state)(Tasktracker));