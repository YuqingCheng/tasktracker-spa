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
  }

  componentWillMount() {
      let task = {
        title: '',
        description: '',
        user_name: '',
        time: '',
      }

      if(this.props.match.params.task_id) {
        const task_id = this.props.match.params.task_id;
        task = this.props.tasks[task_id];
        const user_name = task.user_id ? this.props.users[task.user_id].name : '';
        if(task.user_id) {
          delete task.user_id;
        } 
        task = Object.assign({}, task, {user_name: user_name});
      }
      
      this.props.dispatch({
        type: 'UPDATE_TASK_FORM',
        data: task,
      });
  }

  update(ev) {
    let target = $(ev.target);
    let data = {};
    data[target.attr('name')] = target.val();
    this.props.dispatch({
      type: 'UPDATE_TASK_FORM',
      data: data,
    });
  }

  submit_form(ev) {
    if(this.props.match) {
      // update
      api.update_task(this.props.match.params.task_id, this.props.task_form);
    } else {
      // create
      api.create_task(this.props.task_form);
    }

    this.setState({
      redirect: true,
    });
  }

  render() {
    if(this.state.redirect) {
      return (<Redirect to={'/'} />);
    }

    return (
      <Card>
        <CardBody>
            <Form inline>
              <FormGroup>
                <Input type="text" name="title" placeholder="title"
                      value={this.props.task_form.title} onChange={this.update} />
              </FormGroup>
              <FormGroup>
                <Input type="text" name="description" placeholder="description"
                      value={this.props.task_form.description} onChange={this.update} />
              </FormGroup>
              <FormGroup>
                <Input type="selection" name="time" placeholder="0"
                      value={this.props.task_form.time} onChange={this.update} />
              </FormGroup>
              <FormGroup>
                <Input type="text" name="user_name" placeholder="user's name"
                      value={this.props.task_form.user_name} onChange={this.update} />
              </FormGroup>
              <Button onClick={this.submit_form}>Submit</Button>
            </Form>
        </CardBody>
      </Card>
    );
  }
}

const TaskForm = withRouter(connect((state) => ({ 
  tasks: state.tasks, 
  users: state.users, 
  task_form: state.task_form 
}))(TaskFormComponent));

export default TaskForm;