# This file contains the ENV vars necessary to run the app locally.
# It is included in a .slugignore file in order to prevent it from being deployed on Heroku

# This also provides a list of every config variable that needs to be set on Heroku in demo and production.

# In order to add a new config variable, first add the variable to this file, then add it to
# Heroku in demo and production. It will be accessible anywhere in the codebase as ENV['VARNAME'].

ENV['MASHAPE_TOKEN'] = "xfahf97cdsikmm0noygy4zu8yqmqnd"
ENV['BUGSNAG_KEY'] = "595f3228a7a9f5cb92a280273d8e460c"