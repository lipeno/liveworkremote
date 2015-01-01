class AddContactToUsers < ActiveRecord::Migration
  def change
    add_column :users, :contact_web, :string
    add_column :users, :contact_twitter, :string
    add_column :users, :contact_facebook, :string
    add_column :users, :contact_linkedin, :string
  end
end
