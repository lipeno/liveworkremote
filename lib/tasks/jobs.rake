namespace :jobs do
  namespace :import do
    desc "AngelList"
    task :angellist => :environment do
      url = 'https://api.angel.co/1/search?query=remote&type=LocationTag'
      response = HTTParty.get(url)
      remote_job_location_tag_ids =  JSON.parse response.body
      remote_job_location_tag_ids = remote_job_location_tag_ids.map { |n| n["id"] }
      remote_job_location_tag_ids.each do |remote_job_location_tag_id|
        url = "https://api.angel.co/1/tags/" + remote_job_location_tag_id.to_s + "/jobs"
        response = HTTParty.get(url)
        response["jobs"].each do |retrieved_job|
          new_job = Job.new(provider:"angellist", provider_id: retrieved_job["id"], description: retrieved_job["description"], title: retrieved_job["title"], company: retrieved_job["startup"]["name"], url: retrieved_job["angellist_url"], published_at: retrieved_job["updated_at"])
          new_job.save
        end
      end
    end
  end
end