class HtmlParser
  def self.remove_html_tags source
    re = /<("[^"]*"|'[^']*'|[^'">])*>/
    return source.gsub(re, " ")
  end
end