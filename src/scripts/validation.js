const form = document.getElementById('signup');

const email = document.getElementById('email');
const emailError = document.querySelector('#email + .error-line');

const firstname = document.getElementById('firstname');
const firstnameError = document.querySelector('#firstname + .error-line');

const phone = document.getElementById('phone');
const phoneError = document.querySelector('#phone + .error-line');

const message = document.getElementById('message');
const messageError = document.querySelector('#message + .error-line');

email.addEventListener('input', function (event) {
  if (email.validity.valid) {
    emailError.textContent = '';
    emailError.className = 'error';
  } else {
    showError();
  }
});

message.addEventListener('input', function (event) {
  if (message.validity.valid) {
    messageError.textContent = '';
    messageError.className = 'error';
  } else {
    showErrorMessage();
  }
});

firstname.addEventListener('input', function (event) {
  if (firstname.validity.valid) {
    firstnameError.textContent = '';
    firstnameError.className = 'error';
  } else {
    showErrorFirstname();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    emailError.textContent = 'Enter your email';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  emailError.className = 'error active';
}

function showErrorMessage() {
  if (message.validity.valueMissing) {
    messageError.textContent = 'Enter your message';
  } else if (message.validity.typeMismatch) {
    messageError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (message.validity.tooShort) {
    messageError.textContent = `Message should be at least ${message.minLength} characters; you entered ${message.value.length}.`;
  }
  messageError.className = 'error active';
}

function showErrorFirstname() {
  if (firstname.validity.valueMissing) {
    firstnameError.textContent = 'Enter your Firstname';
  }
  firstnameError.className = 'error active';
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (
    email.validity.valid &&
    firstname.validity.valid &&
    phone.validity.valid &&
    message.validity.valid
  ) {
    console.log(email.value, firstname.value, phone.value, message.value);
  }
});
