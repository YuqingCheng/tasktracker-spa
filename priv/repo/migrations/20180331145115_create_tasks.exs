defmodule Tasktracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :description, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :time, :integer

      timestamps()
    end

    create index(:tasks, [:user_id])
  end
end
