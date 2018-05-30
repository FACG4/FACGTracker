const { google } = require('googleapis');
const inviteStudent = require('../model/quires/invite_student');
const emailSetup = require('./email_setup');
require('env2')('./config.env');

const gmailCbUrl = process.env.ENV === 'production' ? 'https://facgtracker.herokuapp.com/gmail/cb' : 'http://localhost:3000/gmail/cb';
const scopes = [
  'https://www.googleapis.com/auth/gmail.send'
];
const cohortId = 1; // get from cf info
let studentEmail;

exports.get = (req, res, next) => {
  inviteStudent.getunregisteredStudents(cohortId, (getUnregisteredError, emails) => {
    if (getUnregisteredError) {
      console.error('get unregistered students', getUnregisteredError);
      next(getUnregisteredError);
    } else {
      res.render('inviteSt', {
        emails,
        style: [
          'manage_student_style.css', 'invite_students.css'
        ],
        script: [
          'manage_st_dom.js',
          'invite_st.js'
        ],
        name: req.user.name,
        avatar: req.user.avatar
      });
    }
  });
};

exports.getcode = (req, res, next) => {
  studentEmail = req.body.email;
  inviteStudent.checkInviteEmail(studentEmail, (checkInviteEmailError, exist) => {
    if (checkInviteEmailError) {
      console.error('checkInviteEmail error', checkInviteEmailError);
      next(checkInviteEmailError);
    } else if (exist[0].exists) {
      res.send({ exist: 'The email exist' });
    } else {
      const data = {
        client_id: process.env.GMAILCLIENTID,
        redirect_uri: gmailCbUrl,
        response_type: 'code',
        scope: scopes[0]
      };
      res.send(data);
    }
  });
};

exports.gettoken = (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAILCLIENTID,
    process.env.GMAILSECRETE,
    gmailCbUrl
  );
  const githubloginLink = 'https://facgtracker.herokuapp.com/login';
  if (!req.query.code) {
    console.error('No auth code');
    next('No autherisation code');
  } else {
    oauth2Client.getToken(req.query.code, (err, tokens) => {
      if (err) {
        console.error('getTokenerr', err);
        next(err);
      } else {
        oauth2Client.setCredentials(tokens);
        const gmail = google.gmail('v1');
        const base64EncodedEmail = emailSetup.email(studentEmail, 'FACG4', githubloginLink);
        gmail.users.messages.send({
          userId: 'me',
          auth: oauth2Client,
          resource: {
            raw: base64EncodedEmail
          }
        }, (sendGmailError, result) => {
          if (sendGmailError) {
            console.error('send gmail api error', sendGmailError);
            next(sendGmailError);
          } else {
            console.log('done', result.data.labelIds);
            inviteStudent.insertInviteEmail(studentEmail, 'student', cohortId, (insertInviteEmailError, insertResponse) => {
              if (insertInviteEmailError) {
                console.error('insertInviteEmailError', insertInviteEmailError);
                next(insertInviteEmailError);
              } else {
                res.redirect('/inviteSt');
              }
            });
          }
        });
      }
    });
  }
};
