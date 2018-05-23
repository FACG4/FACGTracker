const { google } = require('googleapis');
const request = require('request');
// const nodemailer = require('nodemailer');
require('env2')('./config.env');

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAILCLIENTID,
  process.env.GMAILSECRETE,
  'http://localhost:3000/gmail/cb'
);
const scopes = [
  'https://www.googleapis.com/auth/gmail.send'
];
const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});
exports.get = (req, res) => {
  res.render('invite');
};

let studentEmail;
exports.getcode = (req, res) => {
  request(url, (err, response, body) => {
    if (err) return console.log('gettoken error', err);
    res.send(body);
    studentEmail = req.body.studentEmail;
    console.log('studentEmail', req.body);
  });
};
exports.gettoken = (req, res) => {
  oauth2Client.getToken(req.query.code, (err, tokens) => {
    console.log('tokens', tokens);
    oauth2Client.setCredentials(tokens);
    // google.options({
    //   auth: oauth2Client
    // });
    const gmail = google.gmail('v1');
    const emailLines = [];
    emailLines.push('From: abuata1987@gmail.com');
    emailLines.push(`To: ${studentEmail}`);
    emailLines.push('Content-type: text/html;charset=iso-8859-1');
    emailLines.push('MIME-Version: 1.0');
    emailLines.push('Subject: gmailapi testing');
    emailLines.push('');
    emailLines.push('i hope this msg reach finally.<br>');
    emailLines.push('The body is in HTML so <b>we could even use bold</b>');
    const email = emailLines.join('\r\n').trim();
    let base64EncodedEmail = Buffer.from(email).toString('base64');
    base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');
    console.log('based64emal', base64EncodedEmail);
    gmail.users.messages.send({
      userId: 'me',
      auth: oauth2Client,
      resource: {
        raw: base64EncodedEmail
      }
    }, (err1, resultss) => {
      if (err1) {
        console.log('sendgmailerr', err);
      } else {
        console.log('done', resultss);
        res.redirect('/');
      }
    });
  });
};
