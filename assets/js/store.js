import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 *  
 *
 * */

function posts(state = [], action) {
  return state;
}

function users(state = [], action) {
  return state;
}

let empty_form = {
  user_id: "",
  body: "",
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function login(state = {name: '', pass: ''}, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
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
  let reducer = combineReducers({posts, users, form, login, token});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;