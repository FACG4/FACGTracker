const btnAddTypeFlag = selector('.add_flag_btn_style');
const selectType = selector('.flag_types_style');
const divnone = selector('.divnone');
const routeName = document.querySelectorAll('a[name=RedFlags]')[0];
routeName.classList.add('selected_item');

btnAddTypeFlag.addEventListener('click', () => {
  const data = JSON.stringify({
    flagType: selectType.value,
    user_id: divnone.textContent
  });
  fetch('/postRedflag', {
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: data
  })
    .then((res) => {
      swal('Add feedback', 'your feed back has been succesfully added', 'success')
        .then((ok) => {
          location.reload();
        });
    })
    .catch((err) => {
      console.log('There has been an error in post feedback', err);
    });
});
