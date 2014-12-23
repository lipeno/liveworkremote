module Api
  class PlacesController < ApplicationController
    def index
      respond_to do |format|
        format.json do
          # url = 'http://coworkingvisamap.com/getjson.php'
          # @places = HTTParty.get(url)
          @places= JSON.parse(File.read("#{Rails.root}/app/coworkingSpaces.json")) #Have to get path here
        end
      end
    end
  end
end