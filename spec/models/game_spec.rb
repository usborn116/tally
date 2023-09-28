require 'rails_helper'

RSpec.describe Game, type: :model do
  before(:context) do
    @user = @user = User.last || User.create(name:'Usertest', email: 'user_email@email.com', password:'userpassword')
    @game = @user.games.create(category_count: 3)
  end

  context 'after a game is created' do
    it 'creates as many categories in the game as you entered' do
      expect(@game.categories.length).to eq(3)
      expect(@game.categories.first.name).to eq('New Category/Round')
      expect(@game.categories.first.point_based).to eq(true)
    end
  end
end
