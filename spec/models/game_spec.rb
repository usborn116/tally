require 'rails_helper'

RSpec.describe Game, type: :model do
  before(:context) do
    @user = User.last || User.create(name:'Usertest', email: 'user_email@email.com', password:'userpassword')
    @game = @user.games.find_or_create_by(name: 'testgame', category_count: 3)
    @user.games.find_or_create_by(name: 'testgame2')
  end

  context 'after a game is created' do
    it 'creates as many categories in the game as you entered' do
      expect(@game.categories.length).to eq(3)
      expect(@game.categories.first.name).to eq('New Category/Round')
      expect(@game.categories.first.point_based).to eq(true)
    end

    it 'you can search for a game to get the right one' do
      expect(@user.games.filter_by_name('test').length).not_to eq(0)
      expect(@user.games.filter_by_name('t').length).not_to eq(0)
      expect(@user.games.filter_by_name('txst').length).to eq(0)
      expect(@user.games.filter_by_name('te').first.name).to eq('testgame')
      expect(@user.games.filter_by_name('tes').last.name).to eq('testgame2')
      
    end
  end
end
