class TweetsController < ApplicationController
  respond_to :xml, :json

  def search
    search = Rails.cache.fetch("sumup_hashtag") do 
      client.search("#sumup -rt").to_json
    end
    respond_with search
  end

  def retweets
    search = Rails.cache.fetch("retweets_#{params[:id]}") do 
      client.retweets(params[:id]).to_json
    end
    respond_with search
  end

  def tweet
    search = Rails.cache.fetch("tweet_#{params[:id]}") do 
      client.tweet(params[:id]).to_json
    end
    respond_with search
  end

  private
    def client
      TwitterClient.new session
    end
end