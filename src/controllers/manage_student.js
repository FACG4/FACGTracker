const getStNames = require('../model/quires/get_students_names');
const deleteStudent = require('../model/quires/delete_student');


exports.get = (req, res) => {
  getStNames((getStNamesErr, getStNamesResult) => {
    if (getStNamesErr) return res.status(500);
    res.render('manage_student', {
      names: getStNamesResult,
      style: ['manage_student_style.css'],
      script: ['manage_st_dom.js'],
    });
  });
};

exports.delete = (req, res) => {
  deleteStudent(req.body.id, (deleteStudentErr) => {
    if (deleteStudentErr) return res.status(500);
  });
};
