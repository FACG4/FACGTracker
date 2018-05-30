const routeName = document.querySelectorAll('a[name=studentsM]')[0];
routeName.classList.add('selected_item');
const routeNameDiv = document.querySelectorAll('div[name=students]')[0];
routeNameDiv.classList.add('selected_item');
routeNameDiv.lastElementChild.classList.remove('disable1');
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
            return fetch('/deleteStudent', {
              credentials: 'same-origin',
              headers: {
                'content-type': 'application/json',
              },
              method: 'POST',
              body: data
            })
              .then(res => res.json())
              .then((res) => {
                if (res.err) {
                  swal('Oh noes!', `${res.msg}`, 'error')
                    .then(() => {
                      location.reload();
                    });
                } else {
                  swal(`Poof! student ${res.msg}`, {
                    icon: 'success',
                  });
                  e.target.parentElement.parentElement.remove();
                }
              })
              .catch((err) => {
                console.log('There has been an error in delete student', err);
              });
          } else {
            swal('Student is safe!');
          }
        });
    } else if (e.target.textContent === 'View profile') {
      window.location.href = `/viewProfile/${e.target.parentElement.id}`;
    }
  });
}
