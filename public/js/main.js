const saveAttendanceBtn = document.getElementById('saveAttendanceBtn');
const attendanceTable = document.getElementById('attendanceTable');
const datePicker = document.getElementById('datePicker');

attendanceTable.addEventListener('input', (e) => {
  e.target.parentElement.parentElement.classList.add('changed');
  if (e.target.name === 'clockIn') {
    const select = e.target.parentElement.parentElement.querySelector('select');
    if (e.target.value === '') {
      select.value = 'absent';
    } else {
      select.value = 'present';
    }
  }
});

datePicker.addEventListener('input', () => {
  const date = datePicker.value;
  fetch(`/attendance?date=${date}`, {
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json' },
    method: 'GET'
  })
    .then((res) => {
      window.location = res.url;
    })
    .catch((err) => {
      console.log('something err happend', err);
      swal('Oh no!', 'Some error happen, please try again', 'error')
        .then(() => { window.location.reload(); });
    });
});

saveAttendanceBtn.addEventListener('click', (e) => {
  const changed = document.querySelectorAll('.changed');
  e.preventDefault();
  const students = Array.from(changed);
  students.forEach((item) => {
    const tr = item;
    const fullName = tr.querySelector('#fullName');
    const attend = tr.querySelector('#attend');
    const clockIn = tr.querySelector('#clockIn');
    const clockOut = tr.querySelector('#clockOut');
    const clockOutValue = clockOut.value === '' ? null : clockOut.value;

    const data = JSON.stringify({
      id: fullName.className,
      fullName: fullName.textContent,
      attend: attend.value,
      clockIn: clockIn.value,
      clockOut: clockOutValue,
      date: datePicker.value || Date.now()
    });

    if (attend.value === 'absent') {
      fetch('/attendance/delete', {
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        body: data
      })
        .then(res => res.json())
        .then((res) => {
          if (res.deleted) {
            swal(`Poof! student ${res.msg}`, {
              icon: 'success'
            })
              .then(() => window.location.reload());
          } else {
            swal('Oh noes!', `${res.msg}`, 'error')
              .then(() => { window.location.reload(); });
          }
        })
        .catch((err) => {
          console.error('There has been an error', err);
          swal('Oh no!', 'Some error happen, please try again', 'error')
            .then(() => { window.location.reload(); });
        });
    } else {
      if (tr.classList.contains('changed') && tr.classList.contains('exist')) {
        fetch('/attendance/update', {
          credentials: 'same-origin',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          body: data,
        })
          .then(res => res.json())
          .then((res) => {
            if (res.updated) {
              swal(`Poof! student ${res.msg}`, {
                icon: 'success'
              })
                .then(() => window.location.reload());
            } else {
              swal('Oh noes!', `${res.msg}`, 'error')
                .then(() => { window.location.reload(); });
            }
          })
          .catch((err) => {
            console.log('There has been an error', err);
            swal('Oh no!', 'Some error happen, please try again', 'error')
              .then(() => { window.location.reload(); });
          });
      } else {
        fetch('/attendance/insert', {
          credentials: 'same-origin',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          body: data,
        })
          .then(res => res.json())
          .then((res) => {
            if (res.inserted) {
              swal(`Poof! student ${res.msg}`, {
                icon: 'success'
              })
                .then(() => window.location.reload());
            } else {
              swal('Oh noes!', `${res.msg}`, 'error')
                .then(() => { window.location.reload(); });
            }
          })
          .catch((err) => {
            console.log('There has been an error', err);
            swal('Oh no!', 'Some error happen, please try again', 'error')
              .then(() => { window.location.reload(); });
          });
      }
    }
    tr.classList.remove('changed');
  });
});
