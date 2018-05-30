const reports = selector('#reports');
const divDis = selector('.disable');
reports.addEventListener('click', () => {
  divDis.classList.toggle('disable');
});
const students = selector('#students');
const divDis2 = selector('#studentToggle');
students.addEventListener('click', () => {
  divDis2.classList.toggle('disable1');
});
