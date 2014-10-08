class ListeningController < ApplicationController
	respond_to :json
	after_filter :set_header, only: :voice
  include Webhookable
  skip_before_action :verify_authenticity_token, only: :voice
	
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
		
	end

	def voice
		account_sid = 'ACf355215e0f5adb3e6cd36a17ab01b45d'
		auth_token = 'd5c8347d7e25a1917d0423b30c940791'
	

		# set up a client to talk to the Twilio REST API
		@client = Twilio::REST::Client.new account_sid, auth_token

		response = Twilio::TwiML::Response.new do |r|
      r.Say params['tweets']['currentModal'].to_s
    end
    
    render_twiml response

	end

	def token
    capability = Twilio::Util::Capability.new('ACf355215e0f5adb3e6cd36a17ab01b45d','d5c8347d7e25a1917d0423b30c940791')
    capability.allow_client_outgoing('APe5b31dad46507557e17875921a5cc6fe')
    @token = capability.generate

    respond_with @token
  end
    			
end

