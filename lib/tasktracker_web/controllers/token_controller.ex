defmodule TasktrackerWeb.TokenController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Users
  alias Tasktracker.Users.User

  def create(conn, %{"name" => name, "pass" => pass}) do
    with {:ok, %User{} = user} <- Tasktracker.Users.user_login(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end

  def get(conn, %{"user_id" => user_id, "token" => token}) do
    case Phoenix.Token.verify(conn, "auth token", token) do
      {:ok, user_id} ->
        render conn, "token.json", user: User.get_user!(user_id), token: token
      {:error, _} ->
        nil
    end
  end

  def delete(conn, %{"token" => token}) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged out")
    |> redirect(to: page_path(conn, :index))
  end
end