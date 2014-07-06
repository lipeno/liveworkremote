class Product < ActiveRecord::Base
  belongs_to :advertiser

  has_many :product_colors
  has_many :colors, :through => :product_colors

  accepts_nested_attributes_for :colors
end
