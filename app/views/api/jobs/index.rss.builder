xml.instruct! :xml, version: "1.0"
xml.rss version: "2.0" do
  xml.channel do
    xml.title "Remote Jobs"
    xml.description "LiveWorkRemote Jobs"
    xml.link "http://www.liveworkremote.com"

    @jobs.each do |job|
      xml.item do
        xml.title job.title
        xml.description job.company
        xml.pubDate job.published_at.to_s(:rfc822)
        xml.link job.url
      end
    end
  end
end