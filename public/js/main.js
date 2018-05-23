const saveAttendanceBtn = document.getElementById('saveAttendanceBtn');
const studentData = document.querySelectorAll('.studentData');

saveAttendanceBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const students = Array.from(studentData);

  students.forEach((item) => {
    const fullName = item.querySelector('#fullName');
    const attend = item.querySelector('#attend');

    const clockIn = item.querySelector('#clockIn');
    const clockOut = item.querySelector('#clockOut');
    const data = JSON.stringify({
      id: fullName.className,
      fullName: fullName.textContent,
      attend: attend.value,
      clockIn: clockIn.value,
      clockOut: clockOut.value,
    });

    fetch('/attendance', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .catch((err) => {
        console.log('There has been an error', err);
      });
  });
});
