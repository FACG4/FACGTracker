const routeName = document.querySelectorAll('a[name=studentsI]')[0];
routeName.classList.add('selected_item');
const routeNameDiv = document.querySelectorAll('div[name=students]')[0];
routeNameDiv.classList.add('selected_item');
routeNameDiv.lastElementChild.classList.remove('disable1');

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

const inviteForm = document.querySelector('#inviteByEmail');

inviteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const data = JSON.stringify({ email });
  fetch('/invitebygmail', {
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: data,
  })
    .then(res => res.json())
    .then((res) => {
      if (res.exist) {
        swal('email exists', res.exist, 'error');
      } else {
        const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        const form = document.createElement('form');
        form.setAttribute('method', 'GET');
        form.setAttribute('action', oauth2Endpoint);
        // Add form parameters as hidden input values.
        // eslint-disable-next-line
        for (let p in res) {
          const input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', p);
          input.setAttribute('value', res[p]);
          form.appendChild(input);
        }
        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
      }
    });
});