json.extract! game, :id, :name, :type, :gameplay_length, :player_number, :complexity, :created_at, :updated_at
json.url game_url(game, format: :json)
