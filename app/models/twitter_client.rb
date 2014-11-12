class TwitterClient
  def initialize session
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.secrets.omniauth_provider_key
      config.consumer_secret     = Rails.application.secrets.omniauth_provider_secret
      config.access_token        = session[:twitter_token]
      config.access_token_secret = session[:twitter_secret]
    end
  end

  def search query
    @client.search(query)
  end

  def retweets id
    @client.retweets(id)
  end

  def tweet id
    @client.status(id)
  end
end