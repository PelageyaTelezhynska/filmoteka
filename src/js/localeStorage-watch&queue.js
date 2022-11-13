import markup from './templates/markup-trending.hbs';
import { initFireBase } from './firebase/utils';
import { getFirestore, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

initFireBase();

const db = getFirestore();

const colId  = localStorage.getItem('UserID');;
const colRef = collection(db, colId );

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

  getDocs(colRef)
    .then(snapshot => {
      const myLibList = snapshot.docs[0].data();
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
      const docId = snapshot.docs[0].id;
      let watchedList = myLibList.Watched || [];

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
      const docId = snapshot.docs[0].id;
      let queueList = myLibList.Queue || [];

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
      updateDoc(doc(db, colId , docId), {
        Queue: queueList,
      })
    })
    .catch(err => {
      console.log(err.message)
    })
  }
}
