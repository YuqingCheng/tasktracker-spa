import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.update.bind(this);
    this.create_token.bind(this);
  }

  update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  render() {
    if(props.token) {
      return (
        <div className="navbar-text">
          User id = { props.token.user_id }
        </div>
      );
    } else {
      return (
        <div className="navbar-text">
          <Form inline>
            <FormGroup>
              <Input type="text" name="name" placeholder="name"
                    value={props.login.name} onChange={this.update} />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="pass" placeholder="password"
                    value={props.login.pass} onChange={this.update} />
            </FormGroup>
            <Button onClick={create_token}>Log In</Button>
          </Form>
        </div>
      );
    }
  }
}

export default connect((state) => {
  return {
    token: state.token,
    login: state.login,
  };
})(<Login />);