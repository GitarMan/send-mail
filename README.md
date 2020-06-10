# send-mail #

This is a simple Express.js server to send email notifications.

I built this to handle contact form submissions. 

## Usage ##

You must configure the following variables in a `.env` file in the project root directory to work.

You can copy `sample.env` to `.env` and edit.

Start the server with `npm start`

```
# Example .env Variables
# Uncomment, customize,  & save real file in product rood as '.env'
#
# NODE_ENV=dev|production
#
# CORS_WHITELIST=['http://localhost:3000']
#
# LISTEN_PORT=3000
#
# EMAIL_HOST=smtp.zoho.com
# EMAIL_PORT=465
# EMAIL_SECURE=true
# EMAIL_USER=name@domain.com
# EMAIL_PASS=yourpassword
# EMAIL_FROM=name@domain.com
# EMAIL_TO=name@domain.com
#
# RESPONSE_ERROR="I'm sorry, there seems to have been an error sending your message. Please try again, or contact your administrator"
# RESPONSE_SUCCESS="Message Sent!"
```

## Logging ##

Logging is implemented locally to log errors and ensure message data is not lost.

Logging is made to `send-mail-error.log` and `send-mail-combined.log` files.

Logging to console is turned off when environment variable `NODE_ENV=production`

