require 'rails_helper'

RSpec.describe Category, type: :model do
  before(:context) do
    @user = @user = User.last || User.create(name:'Usertest', email: 'user_email@email.com', password:'userpassword')
    @user.save
    @game = @user.games.create
    @game.save
  end

  context 'after a category is created' do
    it 'sets the "win" column to false by default' do
      category = @game.categories.create(name:'Cat Test')
      expect(category.win).to eq(false)
    end
  end
end
