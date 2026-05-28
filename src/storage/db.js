const DB_NAME = 'pulseboard';
const DB_VERSION = 1;
const STORE_NAME = 'requestHistory';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('serviceId', 'serviceId', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveRecord(record) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.add(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getHistory(serviceId, limit = 500) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('serviceId');
    const range = IDBKeyRange.only(serviceId);
    const records = [];

    const cursor = index.openCursor(range, 'prev');
    cursor.onsuccess = () => {
      if (cursor.result && records.length < limit) {
        records.push(cursor.result.value);
        cursor.result.continue();
      } else {
        resolve(records);
      }
    };
    cursor.onerror = () => reject(cursor.error);
  });
}

export async function getAllHistory() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const all = [];

    const cursor = store.openCursor(null, 'prev');
    cursor.onsuccess = () => {
      if (cursor.result) {
        all.push(cursor.result.value);
        cursor.result.continue();
      } else {
        resolve(all);
      }
    };
    cursor.onerror = () => reject(cursor.error);
  });
}

export async function getHistoryByTimeRange(serviceId, from, to) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('timestamp');
    const range = IDBKeyRange.bound(from, to);
    const records = [];

    const cursor = index.openCursor(range, 'prev');
    cursor.onsuccess = () => {
      if (cursor.result) {
        if (cursor.result.value.serviceId === serviceId) {
          records.push(cursor.result.value);
        }
        cursor.result.continue();
      } else {
        resolve(records);
      }
    };
    cursor.onerror = () => reject(cursor.error);
  });
}

export async function pruneHistory(serviceId, maxRecords) {
  const db = await openDB();
  const all = await getHistory(serviceId);
  if (all.length <= maxRecords) return;

  const toDelete = all.slice(maxRecords);
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  for (const record of toDelete) {
    store.delete(record.id);
  }

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearAllHistory() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
