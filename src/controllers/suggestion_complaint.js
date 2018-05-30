const selectSuggestionComplaint = require('../model/quires/suggestions_complaints');

exports.get = (req, res) => {
  selectSuggestionComplaint.suggestionComplaint((err, result) => {
    if (err) return res.status(500);
    const suggestion = [];
    const complaint = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].type === 'suggestion') {
        suggestion.push(result[i]);
      } else if (result[i].type === 'complaint') {
        complaint.push(result[i]);
      }
    }

    res.render('suggestion_complaint', {
      style: ['suggestion_complaint.css'],
      script: ['asidebar_dom.js', 'com_sugg_dom.js'],
      name: req.user.name,
      avatar: req.user.avatar,
      suggestion,
      complaint,
      err: res.err
    });
  });
};
