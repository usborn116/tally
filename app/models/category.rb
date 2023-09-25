class Category < ApplicationRecord
    belongs_to :game
    after_create :set_win

    private

    def set_win
        self.update(win: false)
    end
end
