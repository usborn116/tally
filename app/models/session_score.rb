class SessionScore < ApplicationRecord
    belongs_to :session
    belongs_to :session_category
    belongs_to :session_player

    #after_save :mark_win

    def mark_win
        self.update(win: false) if !self.session_category.point_based
    end
end
