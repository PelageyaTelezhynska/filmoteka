(() => {
    const refs = {
      openModalAuthBtn: document.querySelector("[data-open-modal]"),
      modal: document.querySelector("[data-modal-auth]"),
      body: document.querySelector('body'),
      closeModalAuthBtn: document.querySelector('[data-modal-auth-close]'),      
    };
  
    refs.openModalAuthBtn.addEventListener("click", toggleModal);
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

      }
  )();

  
// 

// const { initializeApp } = require('firebase/app');
// const { getFirestore, collection, getDocs } = require('firebase/firestore');
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
      apiKey: "AIzaSyC1vNwE6Odm3cY-4r7HKv-I1HhCNLuoCfQ",
      authDomain: "filmoteka-c6a00.firebaseapp.com",
      projectId: "filmoteka-c6a00",
      storageBucket: "filmoteka-c6a00.appspot.com",
      messagingSenderId: "1058279257997",
      appId: "1:1058279257997:web:97275c3089ad13e77f6fc4"
    };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };


const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal-auth');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
    
    // toggle auth modals
authSwitchLinks.forEach(link => {
    link.addEventListener('click', () => {
        authModals.forEach(modal => modal.classList.toggle('is-hidden'));
    });
});
    
// register form

    registerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const email = registerForm.email.value;
    const password = registerForm.password.value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('registered', user);
        registerForm.reset();
      })
      .catch(error => {
        registerForm.querySelector('.error').textContent = error.message;
      });
  });
  
  // login form
  loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const email = loginForm.email.value;
    const password = loginForm.password.value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('logged in', user);
        loginForm.reset();
      })
      .catch(error => {
        loginForm.querySelector('.error').textContent = error.message;
      });
  });


 // auth listener
//   auth.onAuthStateChanged(user => {
//     if (user) {
//       authWrapper.classList.remove('open');
//       authModals.forEach(modal => modal.classList.remove('active'));
//     } else {
//       authWrapper.classList.add('open');
//       authModals[0].classList.add('active');
//     }
//   });

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// // auth trigger (new user signup)
// exports.newUserSignUp = functions.auth.user().onCreate(user => {
//   // for background triggers you must return a value/promise
//   return admin.firestore().collection('users').doc(user.uid).set({
//     email: user.email,
//   });
// });

// // auth trigger (user deleted)
// exports.userDeleted = functions.auth.user().onDelete(user => {
//   const doc = admin.firestore().collection('users').doc(user.uid);
//   return doc.delete();
// });

// // firestore trigger for tracking activity
// exports.logActivities = functions.firestore.document('/{collection}/{id}')
//   .onCreate((snap, context) => {
//     console.log(snap.data());

//     const activities = admin.firestore().collection('activities');
//     const collection = context.params.collection;

//     if (collection === 'users') {
//       return activities.add({ text: 'a new user signed up'});
//     }

//     return null;
// });















 

//   import { initializeApp } from "firebase/app";
// //   import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC1vNwE6Odm3cY-4r7HKv-I1HhCNLuoCfQ",
//   authDomain: "filmoteka-c6a00.firebaseapp.com",
//   projectId: "filmoteka-c6a00",
//   storageBucket: "filmoteka-c6a00.appspot.com",
//   messagingSenderId: "1058279257997",
//   appId: "1:1058279257997:web:97275c3089ad13e77f6fc4"
// };

// // // Initialize Firebase
// // const firebaseApp = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// // Initilize Firebase Authentication and get a reference to the service
// // const auth = getAuth(firebaseApp);

// // var firebase = new firebase();


// // register form
// registerForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
    
//     const email = registerForm.email.value;
//     const password = registerForm.password.value;
  
//     firebase.auth().createUserWithEmailAndPassword(auth, email, password)
//       .then(user => {
//         console.log('registered', user);
//         registerForm.reset();
//       })
//       .catch(error => {
//         registerForm.querySelector('.error').textContent = error.message;
//       });
//   });
  
//   // login form
//   loginForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
    
//     const email = loginForm.email.value;
//     const password = loginForm.password.value;
  
//     firebase.auth().signInWithEmailAndPassword(auth, email, password)
//       .then(user => {
//         console.log('logged in', user);
//         loginForm.reset();
//       })
//       .catch(error => {
//         loginForm.querySelector('.error').textContent = error.message;
//       });
//   });


  