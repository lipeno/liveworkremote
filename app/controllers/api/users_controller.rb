module Api
  class UsersController < ApplicationController
    respond_to :json

    def index
      @users = User.all
      @users = @users.select {|user| user.latitude.nil? == false}
      respond_with @users
    end

    def show
      @user = User.find(params[:id])
      respond_with @user
    end

    # PUT /users/1
    # PATCH /users/1
    def update
      @user = User.find(params[:id])

      respond_to do |format|
        if @user.update(user_params)
          format.json { head :no_content }
        else
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end

    end

    def user_params
      params.require(:user).permit(:full_name, :plans, :work, :hobbies, :latitude, :longitude, :contact_web, :contact_twitter, :contact_linkedin, :contact_facebook)
    end

  end
end

