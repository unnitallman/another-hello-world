# frozen_string_literal: true

Rails.application.routes.draw do
  def draw(routes_name)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end

  devise_for :users, path_prefix: "devise", controllers: { registrations: "registrations" }
  get "/logout" => "sessions#destroy", :as => :logout
  devise_scope :user do
    scope "my" do
      put "profile/update", to: "registrations#update"
      put "password/update", to: "registrations#update_password"
    end
  end

  get "/print/:id", to: "print#show"

  draw :sidekiq
  draw :active_admin
  draw :api

  root "home#index"
  get "*path", to: "home#index", via: :all
end
