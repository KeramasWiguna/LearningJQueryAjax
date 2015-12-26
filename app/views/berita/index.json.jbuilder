json.array!(@berita) do |beritum|
  json.extract! beritum, :id, :judul, :isi
  json.url beritum_url(beritum, format: :json)
end
