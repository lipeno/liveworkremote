class AddUserInfoToUser < ActiveRecord::Migration
  def change
    add_column :users, :full_name, :string
    add_column :users, :plans, :string
    add_column :users, :hobbies, :string
    add_column :users, :work, :string
  end
end
