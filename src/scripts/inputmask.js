import Inputmask from 'inputmask';
const phoneInput = document.getElementById('phone');
const inputMask = new Inputmask('+375-99-999-99-99');
inputMask.mask(phoneInput);
