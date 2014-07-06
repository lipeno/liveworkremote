class ProductPolicy
  attr_reader :user, :product

  def initialize(user, product)
    @user = user
    @product = product
  end

  # def index?
  #   false
  # end
  #
  # def show?
  #   scope.where(:id => record.id).exists?
  # end
  #
  # def create?
  #   false
  # end
  #
  # def new?
  #   create?
  # end

  def update?
    if @user.is_admin?
      true
    else
      false
    end
  end

  def edit?
    update?
  end

  def destroy?
    false
  end

  def scope
    Pundit.policy_scope!(user, product.class)
  end
end

