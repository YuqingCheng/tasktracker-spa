defmodule TasktrackerWeb.TaskView do
  use TasktrackerWeb, :view
  alias TasktrackerWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    data = Enum.reduce(tasks, %{}, fn(task, obj) -> 
      Map.put(obj, task.id, render("task.json", %{task: task}))
    end)
    %{data: data}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      time: task.time,
      user_id: task.user_id
    }
  end
end
