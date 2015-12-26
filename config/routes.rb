Rails.application.routes.draw do
  resources :berita
  root 'utama#index'
end
