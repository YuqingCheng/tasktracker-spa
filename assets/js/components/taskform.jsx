import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Form, FormGroup, NavItem, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import Login from './login.jsx';

class TaskFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.update = this.update.bind(this);
    this.submit_form = this.submit_form.bind(this);
    this.submit_callback = this.submit_callback.bind(this);
  }

  componentWillMount() {
      let task = {
        title: '',
        description: '',
        user_id: 0,
        time: 0,
      }

      if(this.props.match.params.task_id && this.props.match.params.task_id !== '') {
        const task_id = this.props.match.params.task_id;
        task = this.props.tasks[task_id];
      }
      
      this.props.dispatch({
        type: 'UPDATE_TASK_FORM',
        data: task,
      });
  }

  update(ev) {
    let target = $(ev.target);
    console.log(target);
    let data = {};
    data[target.attr('name')] = target.val();
    this.props.dispatch({
      type: 'UPDATE_TASK_FORM',
      data: data,
    });
  }

  submit_form(ev) {
    let task_params = this.props.task_form;

    task_params = Object.assign({}, task_params, {
      user_id: parseInt(task_params.user_id),
      time: parseInt(task_params.time),
    });

    if(task_params.user_id == 0) {
      task_params = Object.assign({}, task_params, {
        user_id: null,
      });
    }

    const data = {
      task_params: task_params,
      token: this.props.token,
    };

    if(this.props.match.params.task_id) {
      // update
      const task_id = parseInt(this.props.match.params.task_id);
      api.update_task(task_id, data, this.submit_callback);
    } else {
      // create
      api.create_task(data, this.submit_callback);
    }

  }

  submit_callback() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    if(this.state.redirect) {
      return (<Redirect to={'/'} />);
    }

    let users = [];

    users.push(<option key={0} value={0}>unassigned</option>);

    for(var key in this.props.users) {
      if(this.props.users.hasOwnProperty(key)) {
        var user = this.props.users[key];
        users.push(
          <option key={user.id} value={parseInt(user.id)}>{user.name}</option>
        );
      }
    }

    return (
      <Card>
        <CardBody>
              <FormGroup>
                <Input type="text" name="title" placeholder="title"
                      value={this.props.task_form.title} onChange={this.update} />
              </FormGroup>
              <FormGroup>
                <Input type="textarea" name="description" placeholder="description"
                      value={this.props.task_form.description} onChange={this.update} />
              </FormGroup>
              <FormGroup>
                <Input type="select" name="user_id"
                      value={this.props.task_form.user_id} onChange={this.update}>
                      {users}
                </Input>
              </FormGroup>
              <FormGroup>
                <Input type="number" name="time" step={15}
                      value={this.props.task_form.time} onChange={this.update}/>
              </FormGroup>
              <Button onClick={this.submit_form}>Submit</Button>
        </CardBody>
      </Card>
    );
  }
}

const TaskForm = withRouter(connect((state) => ({ 
  tasks: state.tasks, 
  users: state.users, 
  token: state.token,
  task_form: state.task_form 
}))(TaskFormComponent));

export default TaskForm;