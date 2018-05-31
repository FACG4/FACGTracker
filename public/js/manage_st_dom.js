const reports = selector('#reports');
let clickno = 0;
let clickno1 = 0;
const divDis = selector('.disable');
reports.addEventListener('click', (e) => {
  clickno += 1;
  if (clickno % 2 === 0) {
    divDis.classList.add('disable');
  } else {
    divDis.classList.remove('disable');
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

const students = selector('#students');
const divDis2 = selector('.disable1');
students.addEventListener('click', (e) => {
  clickno1 += 1;
  if (clickno1 % 2 === 0) {
    divDis2.classList.add('disable1');
  } else {
    divDis2.classList.remove('disable1');
  }
});

const bigDiv = selector('.divs_style');
if (bigDiv) {
  bigDiv.addEventListener('click', (e) => {
    const data = JSON.stringify({
      id: e.target.parentElement.id,
    });
    if (e.target.textContent === 'Delete') {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this student!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            swal('Poof! student has been deleted!', {
              icon: 'success',
            });
            fetch('/deleteStudent', {
              credentials: 'same-origin',
              headers: {
                'content-type': 'application/json',
              },
              method: 'POST',
              body: data,
            })
              .then(res => res.json())
              .catch((err) => {
                console.log('There has been an error in delete student', err);
              });
            e.target.parentElement.parentElement.remove();
          } else {
            swal('Student is safe!');
          }
        });
    } else if (e.target.textContent === 'View profile') {
      window.location.href = `/viewProfile/${e.target.parentElement.id}`;
    }
  });
}
