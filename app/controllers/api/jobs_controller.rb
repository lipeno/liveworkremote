module Api
  class JobsController < ApplicationController
    def index
      respond_to do |format|
        format.json do
          @jobs = Job.all.order('published_at DESC')
        end
      end
    end
  end
end