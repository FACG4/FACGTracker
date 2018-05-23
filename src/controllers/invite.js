const { google } = require('googleapis');
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
  access_type: 'online',
  response_type: 'code',
  scope: scopes
});
let studentEmail;
exports.get = (req, res) => {
  res.render('invite', { url });
};
exports.getcode = (req, res) => {
  studentEmail = req.body.studentEmail;
  res.redirect(url);
};
exports.gettoken = (req, res) => {
  oauth2Client.getToken(req.query.code, (err, tokens) => {
    console.log('tokens', tokens);
    oauth2Client.setCredentials(tokens);
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
