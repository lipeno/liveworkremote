module Api
  class JobsController < ApplicationController
    def index
      @jobs = Job.all.order('published_at DESC')
    end
  end
end