exports.get = (req, res) => {
  res.render('stdPanel', {
    style: ['stdPanel.css'],
    name: req.user.name,
    avatar: req.user.avatar,
  });
};

