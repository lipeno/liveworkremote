json.array!(@jobs) do |job|
  # json.partial! job
  json.extract! job, :id, :title, :description, :published_at, :company, :url
end