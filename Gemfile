# frozen_string_literal: true

source "http://rubygems.org"

gem "actionpack-page_caching"
gem "active_model_serializers", "~> 0.9.0"
gem "bcrypt", "~> 3.1.7"
gem "rails", "~> 5.2.0"
gem "responders"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.1.0", require: false

gem "mysql2", "~> 0.4.2"
gem "pg"
gem "sqlite3"

gem "hiredis"
gem "redis", "~> 3.3.0"
gem "redis-rails"

gem "backbone-on-rails"
gem "coffee-rails"
gem "dynamic_form"
gem "jquery-rails"
gem "json"
gem "sass-rails", "~> 5.0"
gem "sprockets-es6"
gem "uglifier"

gem "b3s_emoticons", git: "https://github.com/b3s/b3s_emoticons.git"
gem "gemoji"
gem "ruby-oembed", require: "oembed"

# gem 'dynamic_image', '~> 2.0.0.beta5
gem "dynamic_image"
gem "fog-aws"
gem "sentry-raven"

# Deploy with Capistrano
group :development do
  gem "capistrano", "~> 3.8.0"
  gem "capistrano-bundler"
  gem "capistrano-rails"
  gem "capistrano-rbenv"
end

# To use debugger
# gem 'ruby-debug'

# OAuth
gem "doorkeeper" # , '~> 0.7.2'

gem "acts_as_list"

gem "daemon-spawn"
gem "httparty", "~> 0.15.0"
gem "nokogiri"

gem "progress_bar"
gem "sunspot_rails", "~> 2.2.0"

gem "newrelic_rpm", group: "newrelic"

gem "fastimage"
gem "font-awesome-rails", "~> 4.7"
gem "redcarpet", "~> 3.0"
gem "rouge"
gem "ruby-filemagic", require: "filemagic"

# TODO: Remove this when the redesign is done
gem "activemodel-serializers-xml"
gem "non-stupid-digest-assets"

group :development do
  gem "web-console"
  gem "yui-compressor", require: "yui/compressor"
end

group :development_mac do
  gem "rb-fsevent"
  gem "ruby_gntp"
end

group :test do
  gem "codeclimate-test-reporter", require: false
  gem "rails-controller-testing"

  # RSpec
  gem "capybara"
  gem "database_cleaner"
  gem "fuubar"
  gem "json_spec"
  gem "rspec-rails"
  gem "shoulda-matchers"
  gem "webmock", require: false
end

group :test, :development do
  gem "dotenv-rails", "~> 0.10.0"
  gem "listen"
  gem "puma"

  gem "sunspot-rails-tester"
  gem "sunspot_solr", "~> 2.1.0"

  gem "pry"

  # FactoryGirl
  gem "factory_girl_rails"

  gem "rubocop", require: false
  gem "rubocop-rspec", require: false
end
