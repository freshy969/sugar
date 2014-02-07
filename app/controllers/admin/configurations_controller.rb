class Admin::ConfigurationsController < AdminController
  before_action :find_configuration

  def show
    redirect_to edit_admin_configuration_url
  end

  def edit
  end

  def update
    if configuration_params
      @configuration.update(configuration_params)
    end
    redirect_to edit_admin_configuration_url
  end

  protected

  def configuration_params
    params[:configuration]
  end

  def find_configuration
    @configuration = Sugar.config
  end
end