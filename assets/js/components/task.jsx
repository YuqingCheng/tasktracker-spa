import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import Login from './login.jsx';

class TaskComponent extends React.Component {
  constructor(props) {
    super(props);

    const id = this.props.id;
    const task = this.props.tasks[id];

    this.state = {
      id: id,
      title: task.title,
      description: task.description,
      time: task.time ? task.time : 'N/A',
      user_name: task.user_id ? this.props.users[task.user_id].name : 'unassigned',
    }
    this.editTask = this.editTask.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillMount(){
    const id = this.props.id;
    const task = this.props.tasks[id];

    this.setState({
      id: id,
      title: task.title,
      description: task.description,
      time: task.time ? task.time : 'N/A',
      user_name: task.user_id ? this.props.users[task.user_id].name : 'unassigned',
    });
  }

  editTask(ev) {
    this.props.parent.setState({
      task_form: this.props.id,
    });
  }

  delete(ev) {
    this.props.onDelete(this.props.id);
  }



  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>{this.state.title}</CardTitle>
          <CardText>Assign Status: {this.state.user_name}</CardText> 
          <CardText>Working Time: {this.state.time}</CardText>
          <CardText>
              Description: {this.state.description}
          </CardText>
          <Button onClick={this.editTask}>Edit</Button>
          <Button onClick={this.delete}>Complete</Button>
        </CardBody>
      </Card>
    );
  }
}

const Task = connect((state) => ({ 
  tasks: state.tasks, 
  users: state.users, 
}))(TaskComponent);

export default Task;