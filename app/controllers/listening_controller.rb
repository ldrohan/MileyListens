class ListeningController < ApplicationController
	respond_to :json

	def static
		# static page
	end	

	def main

		TweetStream.configure do |config|
  	config.consumer_key       = 'BKVxuRlX7tN8IkF2FPicNJpP2'
  	config.consumer_secret    = 'QxWhzLUAMtznt96ZPaOWsENFj5YwXnnT63QTXwp9DZ6RW9ATDX'
  	config.oauth_token        = '21260646-23Ovaksn5ChqfteANQzjQ3uuxdAu8hJCf7NBd8Bfg'
  	config.oauth_token_secret = 'P4uAkjOyJkkNBOfxigwop0tCsD48174lIajzXeAYiaLbo'
  	config.auth_method        = :oauth
		end
		# saves all relevant status'
		@statuses = []
	
		TweetStream::Client.new.track('miley', 'cyrus') do |status, client|
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
		# @english_status.each do |text|
		# @response = Unirest.post "https://t2s.p.mashape.com/speech/",
  #        headers:{"X-Mashape-Key" => "fzWccd97vMmshy215bFxmKet4v66p1nBZYRjsnYOfqMJTaJ09r"},
  #        parameters:{"lang" => "en", :text => text }	
  #   end     
		
	end	
end

