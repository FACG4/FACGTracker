exports.get = (req, res) => {
  res.render('unauthorized', {
    style: ['unauthorized.css'],
    referer: req.header('Referer'),

  });
};

