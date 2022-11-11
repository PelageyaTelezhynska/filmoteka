import { initDataBase } from './utils';
import { addDoc, getDocs, collection } from 'firebase/firestore';
import { async } from '@firebase/util';

const db = initDataBase();

//------------Function for ADD to firestore---------------------//

async function addDataWatched(object) {
  try {
    const docRef = await addDoc(collection(db, 'watched'), object);
    docRef.id;
    console.dir(docRef);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
async function addDataQueue(object) {
  try {
    const docRef = await addDoc(collection(db, 'queue'), object);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

addDataWatched({
  first: 1,
  middle: 'Sasha',
  last: 'gddhd',
  born: 1984,
});

addDataQueue({
  first: 3,
  middle: 'Queue',
  last: 'gddhd',
  born: 1984,
});

//------------Function for GET from firestore---------------------//
async function getDataWatched() {
  const response = [];
  const querySnapshot = await getDocs(collection(db, 'watched'));
  querySnapshot.forEach(doc => {
    console.log(`doc.data()`);
    response.push(doc.data());
  });
  return response;
}

const data = getDataWatched();
console.log('fuck', data);
