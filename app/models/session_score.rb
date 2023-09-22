class SessionScore < ApplicationRecord
    belongs_to :session
    belongs_to :session_category
    belongs_to :session_player
end
