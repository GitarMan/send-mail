require('dotenv').config();
const logger = require('./logger.js');
logger.info('Logger is working');

var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer');

var app = express();
var port = 3001;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/contact-form', (req, res) => {

  logger.info('Request:');
  logger.info(req.body);
  // console.log('Request:');
  // console.log(req.body);

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
      // return console.log(error);
      return;
    }
    logger.info('Message %s sent: \r\n%s', info.messageId, info.response);
    // console.log('Message %s sent: \r\n%s', info.messageId, info.response);
    res.send(process.env.RESPONSE_SUCCESS);
    res.send();
  });
});

// app.listen(port, 'localhost', () => console.log('Server is running at port: %s', port));
app.listen(port, 'localhost', () => logger.info('Server is running at port: %s', port));
