const bigDiv = selector('.divs_style');
bigDiv.addEventListener('click', (e) => {
  if (e.target.textContent === 'Delete') {
    const data = JSON.stringify({
      id: e.target.parentElement.id,
    });

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
          e.target.parentElement.parentElement.remove();
        } else {
          swal('Student is safe!');
        }
      });
  }
});
