xml.instruct! :xml, version: "1.0"
xml.rss version: "2.0" do
  xml.channel do
    xml.title "Remote Jobs"
    xml.description "LiveWorkRemote Jobs"
    xml.link api_jobs_url

    @jobs.each do |job|
      xml.item do
        xml.title job.title
        xml.company job.company
        xml.description job.description
        xml.pubDate job.published_at.to_s(:rfc822)
        xml.link api_job_url(job)
        xml.guid api_job_url(job)
      end
    end
  end
end