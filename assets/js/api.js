import store from './store';

class Api {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          data: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          data: resp.data,
        });
      },
    });
  }

  create_task(data) {
    let user_id = null;
    for(var key in store.users) {
      if(store.users.hasOwnProperty(key)) {
        if(store.users[key].name == data.user_name) {
          user_id = store.users[key].id;
          data.user_id = user_id;
          break;
        }
      }
    }

    if(user_id) {
      $.ajax("/api/v1/tasks", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ token: data.token, task: data }),
        success: (resp) => {
          store.dispatch({
            type: 'ADD_TASK',
            data: resp.data,
          });
        },
      });
    } else {
      alert("user doesn't exist!");
    }   
  }

  update_task(id, data) {
    let user_id = null;
    for(var key in store.users) {
      if(store.users.hasOwnProperty(key)) {
        if(store.users[key].name == data.user_name) {
          user_id = store.users[key].id;
          data.user_id = user_id;
          break;
        }
      }
    }
    if(user_id) {
      $.ajax("/api/v1/tasks/"+id, {
        method: "put",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ token: data.token, task: data, id: id }),
        success: (resp) => {
          store.dispatch({
            type: 'UPDATE_TASK',
            data: resp.data,
          });
        },
      });
    } else {
      alert("user doesn't exist!");
    }
  }

  submit_login(data) {  
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
    });
  }

  verify_login(data) {
    $.ajax("/api/v1/token", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });

      },
    });
  }
}

export default new Api();

