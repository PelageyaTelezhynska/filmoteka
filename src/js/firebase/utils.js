import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//-----------конфігурації Fire Base.  ------------//
// const config = {
//   apiKey: 'AIzaSyDk8J8SmVaOfemZz_M9I9pQzOt5IQ17vRI',
//   authDomain: 'filmoteca-de280.firebaseapp.com',
//   projectId: 'filmoteca-de280',
//   storageBucket: 'filmoteca-de280.appspot.com',
//   messagingSenderId: '270544446865',
//   appId: '1:270544446865:web:c808e57a09696f674e6630',
// };

const config = {
  apiKey: "AIzaSyD6Ady1jhuAgqwFL0qbhu5KyUIJdTFoZmc",
  authDomain: "filmoteka-268b8.firebaseapp.com",
  projectId: "filmoteka-268b8",
  storageBucket: "filmoteka-268b8.appspot.com",
  messagingSenderId: "661144848024",
  appId: "1:661144848024:web:d78c5ac841ef43fb0472ed"
};

function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}

export function initFireBase() {
  return initializeApp(getFirebaseConfig());
}

export function initDataBase() {
  return initFireBase();
}
