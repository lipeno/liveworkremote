require "tasks/html_parser"
require 'oauth2'

namespace :jobs do
  namespace :import do
    desc 'This imports jobs from all sites'
    task :all => :environment do
      puts 'rake: Importing all jobs'
      Rake::Task["jobs:import:angellist"].execute
      Rake::Task["jobs:import:authenticjobs"].execute
      puts 'rake: Done'
    end
    desc "AngelList"
    task :angellist => :environment do
#       client = OAuth2::Client.new("a7e30ed0d31447ac3f61b36d5db9be9b860b4b6c02e08780", "90f1787c1797eac77b566405d8c9fdecac9a47243c77c603", :site => "http://liveworkremote.com")
#
#       client.auth_code.authorize_url(:redirect_uri => 'http://localhost:8080/oauth2/callback')
# # => "https://example.org/oauth/authorization?response_type=code&client_id=client_id&redirect_uri=http://localhost:8080/oauth2/callback"
#
#       token = client.auth_code.get_token('authorization_code_value', :redirect_uri => 'http://localhost:8080/oauth2/callback', :headers => {'Authorization' => 'Basic some_password'})
#       response = token.get('/api/resource', :params => { 'query_foo' => 'bar' })
#       response.class.name
# # => OAuth2::Response

      url = "https://angel.co/api/oauth/token? client_id=...& client_secret=...& code=...& grant_type=authorization_code"
      response = HTTParty.get(url)


      auth_token = "d40569f9fe2a8da42ce9f9c57983eaf3e1e53bc80f8845ab"

      url = 'https://api.angel.co/1/search?query=remote&type=LocationTag&access_token=' + auth_token
      response = HTTParty.get(url)
      remote_job_location_tag_ids =  JSON.parse response.body
      remote_job_location_tag_ids = remote_job_location_tag_ids.map { |n| n["id"] }
      remote_job_location_tag_ids.each do |remote_job_location_tag_id|
        url = "https://api.angel.co/1/tags/" + remote_job_location_tag_id.to_s + "/jobs"
        response = HTTParty.get(url)
        response["jobs"].each do |retrieved_job|
          new_job = Job.new(provider:"angellist", provider_id: retrieved_job["id"], description: retrieved_job["description"], title: retrieved_job["title"], company: retrieved_job["startup"]["name"], url: retrieved_job["angellist_url"], published_at: retrieved_job["updated_at"])
          puts "Importing: " + new_job.inspect
          if new_job.save
            puts "Succeeded!"
          else
            puts "Failed!"
          end
        end
      end
    end

    desc "AuthenticJobs"
    task :authenticjobs => :environment do
      apiKey = "e8c3da4921a2b1d5b0c952821d2232e2"
      url = 'http://www.authenticjobs.com/api/?api_key=' + apiKey + '&method=aj.jobs.search&telecommuting=1&perpage=100&format=json'
      response = HTTParty.get(url)
      job_listings =  JSON.parse(response.body)["listings"]["listing"]
      job_listings.each do |retrieved_job|
        job_url = retrieved_job["apply_url"]? retrieved_job["apply_url"] : retrieved_job["url"]
        parsed_description = HtmlParser.remove_html_tags(retrieved_job["description"])
        company = retrieved_job["company"]? retrieved_job["company"]["name"] : "Individual"
        begin
          new_job = Job.new(provider:"authenticjobs", provider_id: retrieved_job["id"], description: parsed_description, title: retrieved_job["title"], company: company, url: job_url, published_at: retrieved_job["post_date"])
          puts "Importing: " + new_job.inspect
          # if Job.where(:member_id => 4, :group_id => 7).first_or_create
          if new_job.save
            puts "Succeeded!"
          else
            puts "Failed!"
          end
        rescue
          puts "Error with jobs importing"
        end
      end
    end
  end
end
