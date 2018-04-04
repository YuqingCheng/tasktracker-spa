import React from 'react';
import { Form, FormGroup, Input, Button, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import api from "../api";
import classnames from "classnames";

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onTab: '1'
    };
    this.update = this.update.bind(this);
    this.create_token = this.create_token.bind(this);
    this.delete_token = this.delete_token.bind(this);
    this.toggle = this.toggle.bind(this);
    this.register = this.register.bind(this);
  }

  toggle(tab) {
    if(this.state.onTab !== tab) {
      this.setState({
        onTab: tab,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.token !== this.props.token) {
      if(this.props.token) {
        this.props.cookies.set("token", this.props.token);
      } else {
        this.props.cookies.remove("token");
      }
      
    }
  }

  update(ev) {
    let target = $(ev.target);
    let data = {};
    data[target.attr('name')] = target.val();
    this.props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });

    
  }

  create_token(ev) {
    api.submit_login(this.props.login);
    console.log(this.props.login);
  }

  register(ev) {
    api.register(this.props.login);
  }

  delete_token(ev) {
    this.props.dispatch({
      type: "DELETE_TOKEN",
    });
  }

  render() {
    if(this.props.token) {
      let user = this.props.users[this.props.token.user_id];
      return (
        <div className="navbar-text">
          Hello, {user ? user.name : 'visitor'}
          <Button onClick={this.delete_token}>Log Out</Button>
        </div>
      );
    } else {
      return (
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.onTab === '1'})}
                onClick={() => { this.toggle('1');}}
              >Log in</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.onTab === '2'})}
                onClick={() => { this.toggle('2');}}
              >Register</NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.onTab}>
            <TabPane tabId="1">
              <div className="navbar-text">
                <Form inline>
                  <FormGroup>
                    <Input type="text" name="name" placeholder="name"
                          value={this.props.login.name} onChange={this.update} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="password" name="pass" placeholder="password"
                          value={this.props.login.pass} onChange={this.update} />
                  </FormGroup>
                  <Button onClick={this.create_token}>Log In</Button>
                </Form>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="navbar-text">
                <Form inline>
                  <FormGroup>
                    <Input type="text" name="name" placeholder="name"
                          value={this.props.login.name} onChange={this.update} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="password" name="pass" placeholder="password"
                          value={this.props.login.pass} onChange={this.update} />
                  </FormGroup>
                  <Button onClick={this.register}>Register</Button>
                </Form>
              </div>
            </TabPane>
          </TabContent>
        </div>
      );
    }
  }
}

const Login =  connect(state => ({
  token: state.token,
  login: state.login,
  users: state.users,
}))(withCookies(LoginBox));

export default Login;