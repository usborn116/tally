class SessionMailer < ApplicationMailer
    default from: 'tally@gmail.com'
    before_action  :set_host

    def shared_email
        @user = params[:user]
        @sharer = params[:sharer]
        @game = params[:game]
        @date = params[:date]
        @id = params[:id]
        mail(to: @user.email, subject: 'A New Session Has Been Shared')
    end

    private

    def set_host
      @host = Rails.env.development? ? 'http://localhost:3000' : 'https://tabletoptally.fly.dev' 
    end
end
