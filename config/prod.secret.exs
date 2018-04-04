use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :tasktracker, TasktrackerWeb.Endpoint,
  url: [host: "localhost", port: 5105],
  secret_key_base: "8upS4Tq3e4np9w1OlI7HCGbjs1zZqi5a2A5tJfovC/IcBwuG8XVVTFEn2Gin3SKl"

# Configure your database
config :tasktracker, Tasktracker.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "tasktracker_dev",
  pool_size: 15
