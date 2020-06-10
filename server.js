require('dotenv').config();
const logger = require('./logger.js');
logger.info('Logger is working');

var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    cors = require('cors');

const { check, validationResult } = require('express-validator');

var app = express();
var port = process.env.LISTEN_PORT;

const whitelist = process.env.CORS_WHITELIST;

app.use(cors({
  origin: function(origin, callback){
    if(whitelist.indexOf(origin) === -1){
      var message = "The CORS policy for this origin doesn't " +
                'allow access from the particular origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/send-mail', [
    check('name').exists().withMessage('Please enter your name'),
    check('email').isEmail().withMessage('Please enter a valid email')
  ],
  (req, res) => {

  logger.info('Request:');
  logger.info(req.body);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

  let transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  let mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO, 
    replyTo: `"${req.body.name}" <${req.body.email}>`,
    subject: `Contact Form: ${req.body.name}`,
    text: `# Contact Form #\r\n\r\nName: ${req.body.name}\r\nEmail: ${req.body.email}\r\nPhone: ${req.body.phone}\r\nMessage:\r\n\r\n${req.body.message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(process.env.RESPONSE_ERROR);
      logger.error(error);
      return;
    }
    logger.info('Message %s sent: \r\n%s', info.messageId, info.response);
    res.send(process.env.RESPONSE_SUCCESS);
    res.send();
  });
});

app.listen(port, 'localhost', () => logger.info('Server is running at port: %s', port));
