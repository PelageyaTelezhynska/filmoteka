////////////////////////Initialize Firebase/////////////////////////
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection, doc, getDocs, updateDoc
 } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD6Ady1jhuAgqwFL0qbhu5KyUIJdTFoZmc",
  authDomain: "filmoteka-268b8.firebaseapp.com",
  projectId: "filmoteka-268b8",
  storageBucket: "filmoteka-268b8.appspot.com",
  messagingSenderId: "661144848024",
  appId: "1:661144848024:web:d78c5ac841ef43fb0472ed"
};

// Initialize Firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// refs
const colId  = 'User01';
const colRef = collection(db, colId );

////////////////////////////////////////////////////////////////////


import markup from './templates/markup-trending.hbs';

// const WATCHED = 'Watched';
// const QUEUE = 'Queue';

export function addToLocale(data) {
  const filmObject = JSON.stringify(data);
  const isLibraryPage = location.pathname.includes('library');

  const refs = {
    watched: document.querySelector('.btn-watched'),
    queue: document.querySelector('.btn-queue'),
    maviesList: document.querySelector('.movies__list'),
  };

  refs.watched.addEventListener('click', addToWatched);
  refs.queue.addEventListener('click', addToQueue);

  // get collection data
  getDocs(colRef)
    .then(snapshot => {
      const myLibList = snapshot.docs[0].data();
      // console.log(snapshot.docs[0].id);
      // console.log(myLibList.Watched);
      // console.log(myLibList.Queue);    
      try {
        if (JSON.stringify(myLibList.Watched).includes(filmObject)) {
          refs.watched.classList.add('active-btn');
          refs.watched.textContent = 'REMOVE FROM WATCHED';
        }
      } catch (error) {}
    
      try {
        if (JSON.stringify(myLibList.Queue).includes(filmObject)) {
          refs.queue.classList.add('active-btn');
          refs.queue.textContent = 'REMOVE FROM QUEUE';
        }
      } catch (error) {}

    })
    .catch(err => {
      console.log(err.message)
    })

  function addToWatched() {
    getDocs(colRef)
    .then(snapshot => {
      const myLibList = snapshot.docs[0].data();
      // console.log(myLibList.Watched);
      // console.log(myLibList.Queue);
      const docId = snapshot.docs[0].id;
      let watchedList = myLibList.Watched || [];
      // let watchedList = JSON.parse(localStorage.getItem(WATCHED)) || [];

      if (watchedList.find(el => el.id === data.id)) {
        refs.watched.classList.remove('active-btn');
        refs.watched.textContent = 'ADD TO WATCHED';
  
        watchedList = watchedList.filter(e => e.id !== data.id);
  
        if (isLibraryPage) {
          refs.maviesList.innerHTML = markup(watchedList);
          refs.watched.disabled = true;
          refs.watched.removeEventListener('click', addToWatched);
        }
      } else {
        refs.watched.classList.add('active-btn');
        refs.watched.textContent = 'REMOVE FROM WATCHED';
  
        watchedList.push(data);
      }
      // localStorage.setItem(WATCHED, JSON.stringify(watchedList));
      // const docRef = doc(db, colId , docId)
      updateDoc(doc(db, colId , docId), {
        Watched: watchedList,
      })

    })
    .catch(err => {
      console.log(err.message)
    })

  }

  function addToQueue() {
    getDocs(colRef)
    .then(snapshot => {
      const myLibList = snapshot.docs[0].data();
      // console.log(myLibList.Watched);
      // console.log(myLibList.Queue);
      const docId = snapshot.docs[0].id;
      let queueList = myLibList.Queue || [];
      // let queueList = JSON.parse(localStorage.getItem(QUEUE)) || [];

      if (queueList.find(el => el.id === data.id)) {
        refs.queue.classList.remove('active-btn');
        refs.queue.textContent = 'ADD TO QUEUE';
  
        queueList = queueList.filter(e => e.id !== data.id);
  
        if (isLibraryPage) {
          refs.maviesList.innerHTML = markup(queueList);
          refs.queue.disabled = true;
          refs.queue.removeEventListener('click', addToQueue);
        }
      } else {
        refs.queue.classList.add('active-btn');
        refs.queue.textContent = 'REMOVE FROM QUEUE';
  
        queueList.push(data);
      }
      // localStorage.setItem(QUEUE, JSON.stringify(queueList));
      // const docRef = doc(db, colId , docId)
      updateDoc(doc(db, colId , docId), {
        Queue: queueList,
      })

    })
    .catch(err => {
      console.log(err.message)
    })



  }
}
