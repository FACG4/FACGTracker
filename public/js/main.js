const saveAttendanceBtn = document.getElementById('saveAttendanceBtn');
const attendanceTable = document.getElementById('attendanceTable');

attendanceTable.addEventListener('input', (e) => {
  console.log('working');
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
    });

    if (attend.value === 'absent') {
      fetch('/attendance/delete', {
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        body: data
      })
        .then(res => res.json())
        .catch((err) => {
          console.log('There has been an error', err);
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
          .catch((err) => {
            console.log('There has been an error', err);
          });
      } else {
        fetch('/attendance/insert', {
          credentials: 'same-origin',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          body: data,
        })
          .then(res => res.json())
          .catch((err) => {
            console.log('There has been an error', err);
          });
      }
    }
    tr.classList.remove('changed');
  });
});

// window.addEventListener('load', () => {
//   fetch('/', {
//     headers: { 'content-type': 'application/json' },
//     method: 'POST',
//     body: data
//   })
//     .then(res => res.json());
// });
