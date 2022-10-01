import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  // Connect to the database and object store
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Get and return data
  const request = store.put({content});
  const result = await request;
  return result;
};

// Get all the content from the database
export const getDb = async () => {
  console.log("Getting all data from database");
  // Connect to the database and object store
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Get and return data
  const request = store.getAll();
  const result = await request;
  return result.content;
};

initdb();
