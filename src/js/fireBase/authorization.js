const refs = {
  openModalAuthBtn: document.querySelector('[data-open-modal]'),
  signOutBtn: document.querySelector('[data-sign-out]'),
  sigInGoogleBtn: document.querySelector('[data-sigin-google]'),
  modal: document.querySelector('[data-modal-auth]'),
  body: document.querySelector('body'),
  closeModalAuthBtn: document.querySelector('[data-modal-auth-close]'),
  userInfo: document.querySelector('.heder_auth_info'),
};

refs.openModalAuthBtn.addEventListener('click', toggleModal);
refs.closeModalAuthBtn.addEventListener('click', toggleModal);

function toggleModal() {
  window.addEventListener('keydown', onEscPress);
  refs.modal.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
  if (refs.modal.classList.contains('is-hidden')) {
    window.removeEventListener('keydown', onEscPress);
  }
}
function onEscPress(evt) {
  if (evt.key === 'Escape') {
    toggleModal();
  }
}

/////////////--------------------------FIREBASE----------------------------------//////////////////

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onSignIn, GoogleSigIn, onLogOut, onCreateUser } from './firebase-auth';

const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal-auth');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const auth = getAuth();

//-------checked status of user, log in or log out--------
onAuthStateChanged(auth, user => {
  if (user) {
    if (user.emailVerified) {
      refs.modal.classList.add('is-hidden');
      refs.openModalAuthBtn.classList.add('is-hidden');
      refs.sigInGoogleBtn.classList.add('is-hidden');
      refs.signOutBtn.classList.remove('is-hidden');
      refs.userInfo.innerHTML = `
              <img src="${auth.currentUser.photoURL}" width="32" />
              <span>${user.displayName}</span>
            `;
    } else {
      refs.modal.classList.add('is-hidden');
      refs.openModalAuthBtn.classList.add('is-hidden');
      refs.sigInGoogleBtn.classList.add('is-hidden');
      refs.signOutBtn.classList.remove('is-hidden');
      refs.userInfo.innerHTML = `
              <img src="" width="32" />
              <span>${user.email}</span>
            `;
    }
  } else {
    console.log('User Is Out');
    refs.openModalAuthBtn.classList.remove('is-hidden');
    refs.sigInGoogleBtn.classList.remove('is-hidden');
    refs.signOutBtn.classList.add('is-hidden');
    refs.userInfo.innerHTML = ``;
    // User is signed out
  }
});

// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('is-hidden'));
  });
});

// -----------login form----------------//
loginForm.addEventListener('submit', onSignIn);

// -----------Create User----------------//
registerForm.addEventListener('submit', onCreateUser);

// -----------login with GOOGLE----------------//
refs.sigInGoogleBtn.addEventListener('click', GoogleSigIn);

// -----------logOut----------------//
refs.signOutBtn.addEventListener('click', onLogOut);
