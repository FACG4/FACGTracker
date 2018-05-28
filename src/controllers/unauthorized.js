exports.get = (req, res) => {
  console.log(req.header('Referer'));

  res.render('unauthorized', {
    style: ['unauthorized.css'],
    referer: req.header('Referer'),
  });
};

