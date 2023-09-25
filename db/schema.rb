# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_25_184515) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.boolean "point_based"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "game_id", null: false
    t.boolean "win"
    t.index ["game_id"], name: "index_categories_on_game_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.string "gameplay_length"
    t.string "player_number"
    t.string "complexity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.string "image"
    t.index ["user_id"], name: "index_games_on_user_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_players_on_user_id"
  end

  create_table "session_categories", force: :cascade do |t|
    t.string "name"
    t.boolean "point_based"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "session_id", null: false
    t.boolean "win"
    t.index ["session_id"], name: "index_session_categories_on_session_id"
  end

  create_table "session_players", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "session_id", null: false
    t.index ["session_id"], name: "index_session_players_on_session_id"
  end

  create_table "session_scores", force: :cascade do |t|
    t.integer "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "session_id", null: false
    t.bigint "session_category_id", null: false
    t.bigint "session_player_id", null: false
    t.index ["session_category_id"], name: "index_session_scores_on_session_category_id"
    t.index ["session_id"], name: "index_session_scores_on_session_id"
    t.index ["session_player_id"], name: "index_session_scores_on_session_player_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "game_id", null: false
    t.index ["game_id"], name: "index_sessions_on_game_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "categories", "games"
  add_foreign_key "games", "users"
  add_foreign_key "players", "users"
  add_foreign_key "session_categories", "sessions"
  add_foreign_key "session_players", "sessions"
  add_foreign_key "session_scores", "session_categories"
  add_foreign_key "session_scores", "session_players"
  add_foreign_key "session_scores", "sessions"
  add_foreign_key "sessions", "games"
end
