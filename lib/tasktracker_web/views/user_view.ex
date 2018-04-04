defmodule TasktrackerWeb.UserView do
  use TasktrackerWeb, :view
  alias TasktrackerWeb.UserView

  def render("index.json", %{users: users}) do
    data = Enum.reduce(users, %{}, fn(user, obj) -> 
      Map.put(obj, user.id, %{id: user.id, name: user.name})
    end)
    %{data: data}
  end

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      token: token,
    }
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name}
  end
end
