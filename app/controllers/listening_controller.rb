class ListeningController < ApplicationController
	respond_to :json
	after_filter :set_header, only: :voice
	include ESpeak
	
	def static
		# static page
	end	

	def main

		TweetStream.configure do |config|
  	config.consumer_key       = Rails.application.secrets.twitter_consumer_key
  	config.consumer_secret    = Rails.application.secrets.twitter_consumer_secret
  	config.oauth_token        = Rails.application.secrets.twitter_oauth_token
  	config.oauth_token_secret = Rails.application.secrets.twitter_oauth_token_secret
  	config.auth_method        = :oauth
		end

		# saves all relevant status'
		@statuses = []
	
		TweetStream::Client.new.track('Happy', 'Happiness') do |status, client|
  		@statuses << status.text
  		client.stop if @statuses.size >= 10	
		end
		# saves all relevant english lang status'
		@english_status = []

		@statuses.each do |text|
			if text.language == :english
				@english_status << text
			end	
		end

		respond_with @english_status	
		
	end

	def voice
		@speak_tweet = params['tweets']['currentModal']
		respond_with @speak_tweet, :status => :ok
	end

	def instagram
		instID = Rails.application.secrets.instagram_client_id
		response = Typhoeus.get("https://api.instagram.com/v1/tags/happiness/media/recent?client_id=#{instID}")
		instagram_response = JSON.parse(response.body)['data']
	 	
	 	@pic_link = []
		instagram_response.each do |k|
			@pic_link << k['link']
		end
		respond_with @pic_link.first(5)	
	end

end	