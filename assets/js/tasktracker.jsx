import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';

export default function tasktracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <App state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
}

class Tasktracker extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/" exact={true} render={() =>
            <div>
              <p>TODO</p>
            </div>
          } />
        </div>
      </Router>
    );
  }
}

let App = connect((state) => state)((props) => {
  <Tasktracker />
});