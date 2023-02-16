import localforage from 'localforage';
import { unref } from 'vue';

let storages: Record<string, typeof localforage> = {};

export const useStorage = (storageName: string) => {
  // const dbs = localforage;

  if (!storages[storageName]) {
    storages = {
      ...storages,
      [storageName]: localforage
    };

    storages[storageName].config({
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
      ],
      name: storageName
    });
  }

  /**
   * Set item on storage
   *
   * @param key - { string }
   * @param value - { any }
   */
  const setItem = (key: string, value: any): Promise<any> => {
    console.log('setItem', key, storageName);
    return storages[storageName].setItem(
      key,
      JSON.parse(JSON.stringify(unref(value)))
    );
  };

  /**
   * Get item from storage
   *
   * @param key - { string }
   */
  const getItem = async (key: string): Promise<any> => {
    console.log('getItem', key, storageName);
    return storages[storageName].getItem(key);
  };

  /**
   * Remove item from storage
   *
   * @param key - { string }
   */
  const removeItem = (key: string): Promise<any> =>
    storages[storageName].removeItem(key);

  return {
    getItem,
    removeItem,
    setItem
  };
};
