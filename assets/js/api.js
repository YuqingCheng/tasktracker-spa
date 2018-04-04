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

  create_task(data, callback) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data.task_params }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          data: {[resp.data.id]: resp.data},
        });
        $(callback);
      },
      error: (xhr) => {
        alert('please login first');
      }
    });
      
  }

  update_task(id, data, callback) {
    $.ajax("/api/v1/tasks/"+id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ task: data.task_params, id: id, token: data.token }),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_TASK',
          data: {[resp.data.id]: resp.data},
        });
        $(callback);
      },
      error: (xhr) => {
        alert('please login first');
      }
    }); 
  }

  delete_task(id, token) {
    $.ajax("/api/v1/tasks/"+id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: token, id: id }),
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
          data: id,
        });
        //$(callback);
      },
      error: (xhr) => {
        alert('please login first');
      }
    }); 
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
        store.dispatch({
          type: 'RESET_LOGIN_FORM',
        });
      },
      error: (xhr) => {
        alert('please check the username or password');
      }
    });
  }

  register(data) {  
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
        this.request_users();
      },
      error: (xhr) => {
        alert('user might have existed!');
      }
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

