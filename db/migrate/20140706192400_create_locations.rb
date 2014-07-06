class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer  :user_id
      t.string :latitude
      t.string :longitude
      t.timestamps
    end
  end
end