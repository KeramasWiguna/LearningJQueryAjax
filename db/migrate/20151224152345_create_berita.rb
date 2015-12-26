class CreateBerita < ActiveRecord::Migration
  def change
    create_table :berita do |t|
      t.string :judul
      t.text :isi

      t.timestamps null: false
    end
  end
end
