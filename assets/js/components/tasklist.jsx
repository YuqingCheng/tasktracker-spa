import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Form, FormGroup, NavItem, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import Login from './login.jsx';
import Task from './task';

class TaskListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
      task_form: null,
    };
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  addTask(ev) {
    this.setState({task_form: -1});
  }

  deleteTask(id) {
    
    api.delete_task(id, this.props.token);
  }

  render() {

    if(this.state.task_form) {
      if(this.state.task_form < 0) {
        return (<Redirect to={'/taskform'} />);
      } else {
        return (<Redirect to={'/taskform/'+this.state.task_form} />);
      }    
    }

    const tasks = [];
    for(var key in this.props.tasks) {
      if(this.props.tasks.hasOwnProperty(key)) {
        tasks.push(<Task key={this.props.tasks[key].id} 
                         id={this.props.tasks[key].id} 
                         parent={this}
                         onDelete={this.deleteTask} />);
      }
    }

    return (
      <div>
        <Button onClick={this.addTask}>Add Task</Button>
        <div>
          <ul>
            {tasks}
          </ul>
        </div>
      </div>
    );
  }
}

const TaskList = withRouter(connect(state => ({ 
  tasks: state.tasks,
  token: state.token,
}))(TaskListComponent));

export default TaskList;