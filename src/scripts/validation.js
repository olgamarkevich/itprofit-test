import { apiSendFormData } from '../scripts/api';

const form = document.getElementById('signup');
const firstname = document.getElementById('firstname');
const firstnameError = document.querySelector('#firstname + .error-line');
const email = document.getElementById('email');
const emailError = document.querySelector('#email + .error-line');
const phone = document.getElementById('phone');
const phoneError = document.querySelector('#phone + .error-line');
const message = document.getElementById('message');
const messageError = document.querySelector('#message + .error-line');
const serverMessage = document.querySelector('.server-message');
const formBtn = document.getElementById('form-btn');

const fields = [firstname, email, phone, message];
const labels = {
  firstname: firstnameError,
  email: emailError,
  phone: phoneError,
  message: messageError,
};

fields.forEach((field) => {
  field.addEventListener('input', function (event) {
    serverMessage.innerHTML = '';
    if (field.validity.valid) {
      labels[field.id].textContent = '';
      labels[field.id].className = 'error';
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
      showError(field.id);
    }
  });
});

function showError(field) {
  switch (field) {
    case 'firstname':
      serverMessage.innerHTML = '';
      if (firstname.validity.valueMissing) {
        firstnameError.textContent = 'Enter your Firstname';
      }
      firstnameError.className = 'error active';
      break;

    case 'email':
      if (email.validity.valueMissing) {
        emailError.textContent = 'Enter your email';
      } else if (email.validity.typeMismatch) {
        console.log(email.validity);
        emailError.textContent = 'Entered value needs to be an e-mail address.';
      } else if (email.validity.tooShort) {
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
      }
      emailError.className = 'error active';
      break;

    case 'phone':
      serverMessage.innerHTML = '';
      if (phone.validity.valueMissing) {
        phoneError.textContent = 'Enter your phone';
      }
      phoneError.className = 'error active';
      break;

    case 'message':
      serverMessage.innerHTML = '';
      if (message.validity.valueMissing) {
        messageError.textContent = 'Enter your message';
      } else if (message.validity.tooShort) {
        messageError.textContent = `Message should be at least ${message.minLength} characters; you entered ${message.value.length}.`;
      }
      messageError.className = 'error active';
      break;
  }
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

    const result = await apiSendFormData(user);

    if (result === null) {
      serverMessage.innerText = 'Network error';
      serverMessage.classList.remove('success');
      serverMessage.classList.add('error-m');
    } else if (result.status === 'success') {
      serverMessage.innerText = result.message;
      serverMessage.classList.remove('error-m');
      serverMessage.classList.add('success');

      fields.forEach((field) => {
        field.value = '';
        field.classList.remove('durty');
      });
    } else if (result.status === 'error') {
      serverMessage.innerText = result.message;
      serverMessage.classList.remove('success');
      serverMessage.classList.add('error-m');
    }
  }
});
