exports.email = (studentEmail, cohortName, githubLoginLink) => {
  const emailLines = [];
  emailLines.push(`To: ${studentEmail}`);
  emailLines.push('Content-type: text/html');
  emailLines.push('MIME-Version: 1.0');
  emailLines.push('Subject: Invitation for facgtracker');
  emailLines.push('');
  emailLines.push('<h2>Invitation to sign up at facgtracker</h2>');
  emailLines.push(`<b>Hello ${cohortName} students</b><br>`);
  emailLines.push(`you are invited to Set up your account at facgtracker web app, please use<br><a href="${githubLoginLink}">this link</a> to log in with your github account that associated with this email ${studentEmail}`);
  emailLines.push('<br>if you have any trouble loging in please reply to this email');
  const email = emailLines.join('\r\n').trim();
  let base64EncodedEmail = Buffer.from(email).toString('base64');
  base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');
  return base64EncodedEmail;
};
