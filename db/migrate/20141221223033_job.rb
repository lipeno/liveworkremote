class Job < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :company
      t.string :title
      t.text :description
      t.string :url

      t.timestamps null: false
    end
  end
end
