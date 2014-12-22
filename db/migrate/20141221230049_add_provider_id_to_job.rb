class AddProviderIdToJob < ActiveRecord::Migration
  def change
    add_column :jobs, :provider_id, :integer
  end
end
