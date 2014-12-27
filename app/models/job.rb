class Job < ActiveRecord::Base
  validates_uniqueness_of :provider_id, :scope => [:provider]

end