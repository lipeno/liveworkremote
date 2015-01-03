require 'mailchimp'

module Api
  class NewsletterController < ActionController::Base
    def subscribe
        email = params[:email]
        mailchimp_api_key = 'ed3fbea391311526c384b43bc1da3fb9-us3'
        list_id = "0fc9a731db"
        double_optin = false

        mailchimp = Mailchimp::API.new(mailchimp_api_key)
        @message = "You have signed up successfully!"
        begin
          response = mailchimp.lists.subscribe(list_id, {'email' => email}, nil, 'html', double_optin)
        rescue => e
          @message = e.to_s + "!"
        end

        @message
    end
  end
end