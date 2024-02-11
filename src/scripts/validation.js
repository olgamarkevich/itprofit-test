const form = document.getElementById('signup');

const email = document.getElementById('email');
const emailError = document.querySelector('#email + .error-line');

const firstname = document.getElementById('firstname');
const firstnameError = document.querySelector('#firstname + .error-line');

const phone = document.getElementById('phone');
const phoneError = document.querySelector('#phone + .error-line');

const message = document.getElementById('message');
const messageError = document.querySelector('#message + .error-line');

const serverMessage = document.querySelector('.server-message');

const formBtn = document.getElementById('form-btn');

email.addEventListener('input', function (event) {
  serverMessage.innerHTML = '';
  if (email.validity.valid) {
    emailError.textContent = '';
    emailError.className = 'error';

    if (
      email.validity.valid &&
      firstname.validity.valid &&
      phone.validity.valid &&
      message.validity.valid
    ) {
      formBtn.disabled = false;
    }
  } else {
    formBtn.disabled = true;
    showError();
  }
});

phone.addEventListener('input', function (event) {
  serverMessage.innerHTML = '';
  if (phone.validity.valid) {
    phoneError.textContent = '';
    phoneError.className = 'error';

    if (
      email.validity.valid &&
      firstname.validity.valid &&
      phone.validity.valid &&
      message.validity.valid
    ) {
      formBtn.disabled = false;
    }
  } else {
    formBtn.disabled = true;
    showErrorPhone();
  }
});

message.addEventListener('input', function (event) {
  serverMessage.innerHTML = '';
  if (message.validity.valid) {
    messageError.textContent = '';
    messageError.className = 'error';

    if (
      email.validity.valid &&
      firstname.validity.valid &&
      phone.validity.valid &&
      message.validity.valid
    ) {
      formBtn.disabled = false;
    }
  } else {
    formBtn.disabled = true;
    showErrorMessage();
  }
});

firstname.addEventListener('input', function (event) {
  firstname.classList.add('durty');
  serverMessage.innerHTML = '';
  if (firstname.validity.valid) {
    firstnameError.textContent = '';
    firstnameError.className = 'error';

    if (
      email.validity.valid &&
      firstname.validity.valid &&
      phone.validity.valid &&
      message.validity.valid
    ) {
      formBtn.disabled = false;
    }
  } else {
    formBtn.disabled = true;
    showErrorFirstname();
  }
});

function showError() {
  email.classList.add('durty');
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
  serverMessage.innerHTML = '';
  message.classList.add('durty');
  if (message.validity.valueMissing) {
    messageError.textContent = 'Enter your message';
  } else if (message.validity.typeMismatch) {
    messageError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (message.validity.tooShort) {
    messageError.textContent = `Message should be at least ${message.minLength} characters; you entered ${message.value.length}.`;
  }
  messageError.className = 'error active';
}

function showErrorPhone() {
  phone.classList.add('durty');
  serverMessage.innerHTML = '';
  if (phone.validity.valueMissing) {
    phoneError.textContent = 'Enter your message';
  } else if (phone.validity.typeMismatch) {
    phoneError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (phone.validity.tooShort) {
    phoneError.textContent = `Message should be at least ${phone.minLength} characters; you entered ${phone.value.length}.`;
  }
  phoneError.className = 'error active';
}

function showErrorFirstname() {
  firstname.classList.add('durty');
  serverMessage.innerHTML = '';
  if (firstname.validity.valueMissing) {
    firstnameError.textContent = 'Enter your Firstname';
  }
  firstnameError.className = 'error active';
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  if (
    email.validity.valid &&
    firstname.validity.valid &&
    phone.validity.valid &&
    message.validity.valid
  ) {
    const user = {
      email: email.value,
      firstname: firstname.value,
      phone: phone.value,
      message: message.value,
    };

    const response = await fetch('http://localhost:9090/api/registration', {
      method: 'POST',
      body: JSON.stringify(user),
    });

    const result = await response.json();

    if (result.status === 'success') {
      serverMessage.innerText = result.message;
      serverMessage.classList.remove('error-m');
      serverMessage.classList.add('success');
      phone.value = '';
      message.value = '';
      firstname.value = '';
      email.value = '';
      phone.classList.remove('durty');
      firstname.classList.remove('durty');
      message.classList.remove('durty');
      email.classList.remove('durty');
    } else if (result.status === 'error') {
      serverMessage.innerText = result.message;
      serverMessage.classList.remove('success');
      serverMessage.classList.add('error-m');
    }
  }
});
