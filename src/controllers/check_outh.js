
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('Authenticated');
    if (req.user.emaiLnotInDB) {
      res.redirect('/notincodeacademy');
    } else if (req.user.errDb) {
      next(req.user.errDb);
    } else {
      next();
    }
  } else {
    console.log('Not Authenticated');
    res.redirect('/login');
  }
};

exports.isCF = (req, res, next) => {
  if (req.user.role === 'cf') {
    console.log('CF Authorized');
    next();
  } else {
    console.log('No CF Authorization');
    res.redirect('/unauthorized');
  }
};

exports.isStudent = (req, res, next) => {
  if (req.user.role === 'student') {
    console.log('Student Authorized');
    next();
  } else {
    console.log('No Student Authorization');
    res.redirect('/unauthorized');
  }
};

// stretch goals :)
exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    console.log('Admin Authorized');
    next();
  } else {
    console.log('No Admin Authorization');
    res.redirect('/unauthorized');
  }
};

exports.isMentor = (req, res, next) => {
  if (req.user.role === 'mentor') {
    console.log('Mentor Authorized');
    next();
  } else {
    console.log('No Mentor Authorization');
    res.redirect('/unauthorized');
  }
};
