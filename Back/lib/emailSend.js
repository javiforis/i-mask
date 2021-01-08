/////// ENVÍO EMAIL PARA EL TIMER 

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jforiscot@gmail.com',
    pass: '01804917abcde'
  }
});

let mailOptions = {
  from: 'jforiscot@gmail.com',
  to: 'jforiscot@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'Tu mascarilla ha finalizado su tiempo de uso'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});