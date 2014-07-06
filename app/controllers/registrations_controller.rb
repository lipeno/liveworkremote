class RegistrationsController < Devise::RegistrationsController
  prepend_before_filter :require_no_authentication, only: [ :new, :create, :cancel ]

  def create
    # Create the user
    build_resource(sign_up_params)
    # Try to save them
    if resource.save
      sign_in resource
      render :status => 200,
             :json => current_user
    else
      # Otherwise fail
      render status: :unprocessable_entity,
        json: {
          success: false,
          info: resource.errors,
          data: {}
        }
    end
  end
end