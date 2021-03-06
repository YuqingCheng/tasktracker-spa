import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 *  tasks
 *  { ..task_id: task }
 *  users
 *  { ..user_id: user }
 * */

function tasks(state = {}, action) {
  switch (action.type) {
    case 'TASKS_LIST':
      return Object.assign({}, state, action.data);
    case 'ADD_TASK':
      return Object.assign({}, state, action.data);
    case 'UPDATE_TASK':
      return Object.assign({}, state, action.data);
    case 'DELETE_TASK':
      let next_state = {};
      for(var key in state) {
        if(key != action.data) {
          next_state[key] = state[key];
        }
      }
      
      return next_state;
    default:
      return state;
  }  
}

function users(state = {}, action) {
  switch (action.type) {
    case 'USERS_LIST':
      return Object.assign({}, state, action.data);
    case 'ADD_USER':
      return Object.assign({}, state, action.data);
    case 'UPDATE_USER':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_form = {
  title: "",
  description: "",
  time: 0,
  user_id: 0,
};

function task_form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_TASK_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function login(state = {name: '', pass: ''}, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'RESET_LOGIN_FORM':
      return {name: '', pass: ''};
    default: 
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      if(action.token) {
        return action.token;
      } else {
        return state;
      }
    case 'DELETE_TOKEN':
      return null;     
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({tasks, users, task_form, login, token});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;