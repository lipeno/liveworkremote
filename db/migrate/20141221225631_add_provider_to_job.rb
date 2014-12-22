class AddProviderToJob < ActiveRecord::Migration
  def change
    add_column :jobs, :provider, :string
  end
end
