import { initDataBase } from './utils';
import { addDoc, getDocs, collection, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { refs } from '../refs';

//
const db = initDataBase();
const auth = getAuth();

// //------------Function for ADD to firestore---------------------//

async function addDataWatched(object) {
  try {
    const docRef = await addDoc(
      collection(db, 'filmoteka', auth.currentUser.email, 'watched'),
      object
    );
    console.log(docRef.id);
    console.log('FUNC DATA added to WATCHED');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

async function addDataQueue(object) {
  try {
    const docRef = await addDoc(
      collection(db, 'filmoteka', auth.currentUser.email, 'queue'),
      object
    );
    console.dir(docRef);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

// //------------Function for GET from firestore---------------------//
async function getDataWatched() {
  const response = [];
  const querySnapshot = await getDocs(collection(db, 'filmoteca'));
  console.log(querySnapshot);
  querySnapshot.forEach(doc => {
    response.push(doc.data());
  });
  console.log('response', response);
  return response;
}

// const data = getDataWatched();

// console.log(data);
