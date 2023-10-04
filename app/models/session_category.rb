class SessionCategory < ApplicationRecord
    belongs_to :session
    has_many :session_scores, -> { order(id: :asc) }, dependent: :destroy
end
