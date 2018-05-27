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
