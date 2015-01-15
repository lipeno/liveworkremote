source 'https://rubygems.org'

ruby '2.0.0'
gem 'rails', '4.1.0'

gem 'pg' # Use postgresql as the database for Active Record
gem 'sass-rails', '~> 4.0.0' # Use SCSS for stylesheets
gem 'uglifier', '>= 1.3.0'   # Use Uglifier as compressor for JavaScript assets
gem 'ngmin-rails'   # Angular ng-min purposes
gem 'devise', '3.0.1' # User authentication
gem 'coffee-rails', '~> 4.0.0'
gem "rspec-rails", "~> 2.14.0"
gem 'sprockets-rails', :require => 'sprockets/railtie'
gem 'httparty'
gem 'jbuilder', '~> 1.2'
gem 'mailchimp-api'

group :development do
  gem 'pry'  # Need to include this in gemfile to get automatic require "pry" in each file
  gem 'pry-byebug'
  gem 'pry-rescue'
  gem 'binding_of_caller' # to enable the REPL and local/instance variable inspection for better_errors gem
  gem "better_errors" # Errors screen which pops up in browser and shows details
  gem 'quiet_assets'
end


group :production do
  gem 'unicorn'   # Use unicorn as the app server
  gem 'rails_12factor'
end