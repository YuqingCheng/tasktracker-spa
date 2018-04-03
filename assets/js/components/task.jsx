import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import Login from './login.jsx';

class Task extends React.Component {
  constructor(props) {
    super(props);

    const id = this.props.id;
    const task = this.props.tasks[id];

    this.state = {
      id: id,
      title: task.title,
      description: task.description,
      time: task.time,
      user_name: this.props.users[task.user_id].name,
    }
    this.editTask = this.editTask.bind(this);
  }

  componentDidUpdate(prevProps){
    if(prevProps.id !== this.props.id) {
      const id = this.props.id;
      const task = this.props.tasks[id];

      this.setState({
        id: id,
        title: task.title,
        description: task.description,
        time: task.time,
        user_name: this.props.users[task.user_id].name,
      });
    }
  }

  editTask(ev) {
    this.props.parent.setState({
      task_form: this.props.id,
    });
  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>{this.state.title}</CardTitle>
          <CardSubtitle>assigned to: {this.state.user_name} for {this.state.time} minutes.</CardSubtitle>
          <CardText>
            Description: {this.state.description}
          </CardText>
          <Button onClick={this.editTask}>Edit</Button>
        </CardBody>
      </Card>
    );
  }
}

export default connect((state) => ({ tasks: state.tasks, users: state.users }))((props) => (<Task />));