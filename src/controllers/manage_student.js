const getStNames = require('../model/quires/get_students_names');
const deleteStudent = require('../model/quires/delete_student');

exports.get = (req, res) => {
  getStNames((getStNamesErr, getStNamesResult) => {
    if (getStNamesErr) return res.status(500);
    res.render('manage_student', {
      names: getStNamesResult,
      style: ['manage_student_style.css'],
      script: ['manage_st_dom.js', 'home_dom.js'],
    });
  });
};

exports.delete = (req, res) => {
  deleteStudent(req.body.id, (deleteStudentErr, deleteStudentResult) => {
    // if (deleteStudentErr) return res.status(500);
    if (deleteStudentErr) {
      console.log('deleteStudentErr', deleteStudentErr);
      res.status(500);
    } else if (deleteStudentResult.rowCount === 0) {
      res.send({ msg: 'email does not exist in the database', err: true });
    } else {
      res.send({ msg: 'has been deleted!' });
    }
  });
};
