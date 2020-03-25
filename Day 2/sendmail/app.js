var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dhulipalamurthysrirama@gmail.com',
    pass: 'welcome786'
  }
});

var mailOptions = {
  from: 'dsrmurthysoftware@gmail.com',
  to: 'dhulipalamurthysrirama@gmail.com',
  subject: 'Sending Email using Node.js for testing',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});