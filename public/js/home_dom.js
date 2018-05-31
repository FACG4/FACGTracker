const reports = selector('#reports');
let clickno = 0;
let clickno1 = 0;
const divDis = selector('.disable');
reports.addEventListener('click', () => {
  clickno += 1;
  if (clickno % 2 === 0) {
    divDis.classList.add('disable');
  } else {
    divDis.classList.remove('disable');
  }
});
const students = selector('#students');
const divDis2 = selector('.disable1');
students.addEventListener('click', () => {
  clickno1 += 1;
  if (clickno1 % 2 === 0) {
    divDis2.classList.add('disable1');
  } else {
    divDis2.classList.remove('disable1');
  }
});
const home = selector('#home');
home.addEventListener('click', () => {
  window.location.href = '/';
});
const attendance = selector('#attendance');
attendance.addEventListener('click', () => {
  window.location.href = '/attendance';
});
