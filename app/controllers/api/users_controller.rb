module Api
  class UsersController < ApplicationController
    respond_to :json

    def index
      @users = User.all
      @users = @users.select {|user| user.latitude.nil? == false}
      respond_with @users
    end

    def show
      @users = Advertiser.find(params[:id])
      respond_with @users
    end

  end
end

