const unregisteredUl = document.querySelector('.unregistered-emails');
unregisteredUl.addEventListener('click', (e) => {
  if (e.target.name === 'delete') {
    const data = JSON.stringify({ id: e.target.id });
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
            body: data
          })
            .then(console.log)
            .catch((err) => {
              console.log('There has been an error in delete student', err);
            });
          e.target.parentElement.remove();
        }
      });
  }
});
