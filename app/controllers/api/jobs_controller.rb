module Api
  class JobsController < ApplicationController
    def index
      @jobs = Job.all.order('published_at DESC').where(['published_at > ?', DateTime.now - 2.months])
    end
  end
end