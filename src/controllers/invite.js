const { google } = require('googleapis');
const inviteStudent = require('../model/quires/invite_student');
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
  const cohortId = 1;
  inviteStudent.getunregisteredStudents(cohortId, (err, emails) => {
    if (err) {
      console.error('get unregistered students', err);
    }
    res.render('inviteSt', { emails, style: 'manage_student_style.css', script: 'manage_st_dom.js' });
  });
};
exports.getcode = (req, res) => {
  studentEmail = req.body.studentEmail;
  res.redirect(url);
};
exports.gettoken = (req, res) => {
  const cohortId = 1;
  inviteStudent.checkInviteEmail(studentEmail, (checkInviteEmailError, exist) => {
    if (checkInviteEmailError) {
      // handel error
      console.error('checkInviteEmail error', checkInviteEmailError);
    } else if (exist[0].exists) {
      // sweet alert email already exist
      console.log('checkInviteEmail', exist);
      res.redirect('/inviteSt');
    } else {
      const githubloginLink = 'http://localhost:3000/github';
      oauth2Client.getToken(req.query.code, (err, tokens) => {
        console.log('tokens', tokens);
        oauth2Client.setCredentials(tokens);
        const gmail = google.gmail('v1');
        const emailLines = [];
        emailLines.push('From: abuata1987@gmail.com');
        emailLines.push(`To: ${studentEmail}`);
        emailLines.push('Content-type: text/html;charset=iso-8859-1');
        emailLines.push('MIME-Version: 1.0');
        emailLines.push('Subject: Invitation for facgtracker');
        emailLines.push('');
        emailLines.push('<h2>Invitation to sign up at facgtracker</h2>');
        emailLines.push('<b>Hello facg5 students</b><br>');
        emailLines.push(`you are invited to Set up your account at facgtracker web app, please use<br> this <a href="${githubloginLink}">link</a> to log in with your github account that associated with this email ${studentEmail}`);
        emailLines.push('<br>if you have any trouble loging in please reply to this email');
        const email = emailLines.join('\r\n').trim();
        let base64EncodedEmail = Buffer.from(email).toString('base64');
        base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');
        gmail.users.messages.send({
          userId: 'me',
          auth: oauth2Client,
          resource: {
            raw: base64EncodedEmail
          }
        }, (err1, result) => {
          if (err1) {
            console.log('send gmail api error', err1);
          } else {
            console.log('done', result.data.labelIds);
            // sweet alert (email has been sent to ${studentEmail})
            inviteStudent.insertInviteEmail(studentEmail, 'student', cohortId, (insertInviteEmailError, insertResponse) => {
              if (insertInviteEmailError) {
                // sweet alert (email haven't been add to database, please try again)
                console.error('insertInviteEmailError', insertInviteEmailError);
              } else {
                console.log('insertEmailToDb ', insertResponse);
                res.redirect('/inviteSt');
              }
            });
          }
        });
      });
    }
  });
};
