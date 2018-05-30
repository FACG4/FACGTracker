const textareaAddFeedback = selector('.text_feedback_style');
const FeedbackForm = selector('.feedback_form');
const divnone = selector('.divnone');
const routeName = document.querySelectorAll('a[name=Feedback]')[0];
routeName.classList.add('selected_item');
FeedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (textareaAddFeedback.value === '') {
    swal({
      title: 'Empty feedback !!',
      text: 'plz, sure that you wrote a feedback',
      icon: 'warning',
      buttons: 'Ok',
    });
  } else {
    const data = JSON.stringify({
      feedbackContant: textareaAddFeedback.value,
      user_id: divnone.textContent
    });
    fetch('/postFeedback', {
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
            textareaAddFeedback.value = '';
          });
      })
      .catch((err) => {
        console.log('There has been an error in post feedback', err);
      });
  }
});
