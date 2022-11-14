import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { initFireBase } from './utils';
import { refs } from '../refs';
import Notiflix from 'notiflix';

initFireBase();
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

//-------checked status of user, log in or log out--------
onAuthStateChanged(auth, user => {
  if (user) {
    refs.modal.classList.add('is-hidden');
    refs.body.classList.remove('no-scroll');
    refs.openModalAuthBtn.classList.add('is-hidden');
    refs.sigInGoogleBtn.classList.add('is-hidden');
    refs.signOutBtn.classList.remove('is-hidden');
    refs.userInfo.innerHTML = `
              <span>${user.email}</span>
            `;
    refs.myLibLink.classList.remove('visually-hidden');
    localStorage.setItem('UserID', user.uid);
  } else {
    // console.log('User Is Out');
    refs.openModalAuthBtn.classList.remove('is-hidden');
    refs.sigInGoogleBtn.classList.remove('is-hidden');
    refs.signOutBtn.classList.add('is-hidden');
    refs.userInfo.innerHTML = ``;
    refs.myLibLink.classList.add('visually-hidden');
    localStorage.setItem('UserID', 'DefaultUser');
  }
});

// -----------login form----------------//
refs.loginForm.addEventListener('submit', onSignIn);
// -----------Create User----------------//
refs.registerForm.addEventListener('submit', onCreateUser);
// -----------login with GOOGLE----------------//
refs.sigInGoogleBtn.addEventListener('click', GoogleSigIn);
// -----------logOut----------------//
refs.signOutBtn.addEventListener('click', onLogOut);

function onSignIn(e) {
  e.preventDefault();
  const form = e.target;
  const login = e.target[0].value.trim();
  const password = e.target[1].value.trim();
  signInWithEmailAndPassword(auth, login, password)
    .then(userCredential => {
      const user = userCredential.user;
      Notiflix.Notify.success(`Signin with ${user.email} successful`);
    })
    .catch(error => {
      Notiflix.Notify.failure(`Sign-in  error happened`);
    });
  form.reset();
}

function GoogleSigIn() {
  let userId = null;
  signInWithPopup(auth, provider)
    .then(userCredential => {
      const user = userCredential.user;
      Notiflix.Notify.success(`Sign-in with ${user.email} successful`);
      userId = userCredential.user.uid;
      getDocs(collection(db, userId)).then(snapshot => {
        // const myLibList = snapshot.docs[0].data();
        // console.log(snapshot.docs[0]);
        if (snapshot.docs[0]) console.log('Nice to see you again');
        else {
          setDoc(doc(db, userId, '00000001'), {
            Queue: [],
            Watched: [],
          });
        }
      });
    })
    .catch(error => {
      // if (userId) {
      //   setDoc(doc(db, userId, '00000001'), {
      //     Queue: [],
      //     Watched: [],
      //   });
      //   console.log('First sign in');
      // } else
      Notiflix.Notify.failure('Sign-in with Google account error happened');
    });
}

function onCreateUser(e) {
  e.preventDefault();
  const email = e.target[0].value.trim();
  const password = e.target[1].value.trim();
  const form = e.target;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      Notiflix.Notify.success(`User Created with email:${user.email}`);
      setDoc(doc(db, user.uid, '00000001'), {
        Queue: [],
        Watched: [],
      });
      localStorage.setItem('UserID', user.uid);
    })
    .catch(error => {
      Notiflix.Notify.failure('User no created');
    });
  form.reset();
}

function onLogOut() {
  signOut(auth)
    .then(() => {})
    .catch(error => {});
}
