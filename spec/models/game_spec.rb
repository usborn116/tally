require 'rails_helper'

RSpec.describe Game, type: :model do
  before(:context) do
    @user = User.last || User.create(name:'Usertest', email: 'user_email@email.com', password:'userpassword')
    @user.save
    @game = @user.games.find_or_create_by(name: 'testgame', category_count: 3)
    @game.save
    @game2 = @user.games.find_or_create_by(name: 'testgame2')
    @game2.save
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

  before(:context) do
    @user2 = User.last || User.create(name:'Usertest', email: 'user_email@email.com', password:'userpassword')
    @user2.save
    @game2 = @user2.games.find_or_create_by(name: 'Category Game')
    @game2.save
    @game2.categories.find_or_create_by(name: 'Cat 1')
    @game2.categories.find_or_create_by(name: 'Cat 2')
    @game2.categories.find_or_create_by(name: 'Cat 3')
    @game2.categories.find_or_create_by(name: 'Cat 4')
    @game2.categories.find_or_create_by(name: 'Cat 5')
    @game2.categories.each{|c| c.update!(point_based: false)}
    @session = @game2.sessions.create(date: Date.today(), user_id: @user2.id)
    @session.save
    @player1 = @session.session_players.create(name: 'Player1')
    @player2 = @session.session_players.create(name: 'Player2')
    @player1.save
    @player2.save
  end

  context 'after category based game is created and set up' do
    it 'creates as many categories in the game as you entered' do
      expect(@game2.categories.length).to eq(5)
      expect(@game2.categories.first.point_based).to eq(false)
    end

    it 'when there is a winner in category based game' do
      @player1.session_scores.each{|s| s.update!(win: true)}
      @player2.session_scores.each{|s| s.update!(win: false)}
      @session.winner
      expect(@session.victor).to eq('Player1')
    end

    it 'when there is another winner in category based game' do
      @player2.session_scores.each{|s| s.update!(win: true)}
      @player1.session_scores.each{|s| s.update!(win: false)}
      @session.winner
      expect(@session.victor).to eq('Player2')
    end

    it 'when the game is tied' do
      @player2.session_scores.each{|s| s.update!(win: false)}
      @player1.session_scores.each{|s| s.update!(win: false)}
      @player1.session_scores.first.update(win:true)
      @player2.session_scores.first.update(win:true)
      expect(@session.winner).to eq("Tied between: Player1, Player2")
      expect(@session.victor).to eq('Tied')
    end

    it 'when the game also has scoring categories' do
      @game2.categories.find_or_create_by(name: 'Cat 4')
      @game2.categories.find_or_create_by(name: 'Cat 5')
      @game2.categories.last(2).each{|c| c.update(point_based: true)}
      @session2 = @game2.sessions.create(date: Date.today())
      @player1 = @session2.session_players.find_or_create_by(name: 'Player1')
      @player2 = @session2.session_players.find_or_create_by(name: 'Player2')
      @player1.session_scores.first(3).each{|s| s.update!(win: true)}
      @player2.session_scores.first(3).each{|s| s.update!(win: false)}
      @player1.session_scores.last(2).each{|s| s.update!(amount: 1)}
      @player2.session_scores.last(2).each{|s| s.update!(amount: 2)}
      @session2.winner
      expect(@session2.victor).to eq('Player1')
      expect(@player1.session_scores.last(2).map(&:amount).sum).to eq(2)
      expect(@player2.session_scores.last(2).map(&:amount).sum).to eq(4)
    end

    it 'when no one wins the non-scoring categories and there are scored categories' do
      @session3 = @game2.sessions.create(date: Date.today())
      @playera = @session3.session_players.find_or_create_by(name: 'Player1')
      @playerb = @session3.session_players.find_or_create_by(name: 'Player2')
      @playera.session_scores.first(3).each{|s| s.update!(win: false)}
      @playerb.session_scores.first(3).each{|s| s.update!(win: false)}
      @playera.session_scores.last(2).each{|s| s.update!(amount: 1)}
      @playerb.session_scores.last(2).each{|s| s.update!(amount: 2)}
      @session3.winner
      expect(@session3.victor).to eq('Player2')
      expect(@playera.session_scores.last(2).map(&:amount).sum).to eq(2)
      expect(@playerb.session_scores.last(2).map(&:amount).sum).to eq(4)
    end

  end

end
