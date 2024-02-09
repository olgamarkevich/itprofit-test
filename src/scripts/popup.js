const openPopup = document.querySelector('.open-popup');
const popup = document.getElementById('modal-popup');
const closePopup = document.querySelector('.close');
const popupWrapper = document.querySelector('.modal-wrapper');

openPopup.addEventListener('click', () => {
  popup.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closePopup.addEventListener('click', () => {
  popup.classList.remove('open');
  document.body.style.overflow = '';
});
