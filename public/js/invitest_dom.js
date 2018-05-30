const routeName = document.querySelectorAll('a[name=studentsI]')[0];
routeName.classList.add('selected_item');
const routeNameDiv = document.querySelectorAll('div[name=students]')[0];
routeNameDiv.classList.add('selected_item');
const unregisteredUl = document.querySelector('.unregistered-emails');
unregisteredUl.addEventListener('click', (e) => {
  if (e.target.name === 'delete') {
    const data = JSON.stringify({
      id: e.target.id
    });
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this email!',
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
                e.target.parentElement.remove();
              }
            })
            .catch((err) => {
              console.log('There has been an error in delete student', err);
            });
        }
      });
  }
});
