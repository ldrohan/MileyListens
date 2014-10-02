class ListeningController < ApplicationController
	
	def main
		
		TweetStream.configure do |config|
  	config.consumer_key       = 'BKVxuRlX7tN8IkF2FPicNJpP2'
  	config.consumer_secret    = 'QxWhzLUAMtznt96ZPaOWsENFj5YwXnnT63QTXwp9DZ6RW9ATDX'
  	config.oauth_token        = '21260646-23Ovaksn5ChqfteANQzjQ3uuxdAu8hJCf7NBd8Bfg'
  	config.oauth_token_secret = 'P4uAkjOyJkkNBOfxigwop0tCsD48174lIajzXeAYiaLbo'
  	config.auth_method        = :oauth
		end
		
		@statuses = []
	
		TweetStream::Client.new.track('miley') do |status, client|
  		@statuses << status.text
  		client.stop if @statuses.size >= 10	
		end
	
	end	
end

