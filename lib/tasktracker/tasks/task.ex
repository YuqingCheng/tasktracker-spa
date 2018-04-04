defmodule Tasktracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :description, :string
    field :title, :string
    field :user_id, :id
    field :time, :integer

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :user_id, :time])
    |> validate_required([:title, :description])
  end
end
