defmodule TasktrackerWeb.TaskController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Tasks
  alias Tasktracker.Tasks.Task

  action_fallback TasktrackerWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params, "token" => token_params}) do
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token_params["token"])
    if token_params["user_id"] != user_id do
      raise "unauthourized"
    end

    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    {id, _} = Integer.parse id
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params, "token" => token_params}) do
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token_params["token"])
    if token_params["user_id"] != user_id do
      raise "unauthourized"
    end

    {id, _} = Integer.parse(id)
    task = Tasks.get_task!(id)

    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id, "token" => token_params}) do
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token_params["token"])
    if token_params["user_id"] != user_id do
      raise "unauthourized"
    end

    {id, _} = Integer.parse id
    task = Tasks.get_task!(id)
    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
