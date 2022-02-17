import localforage from 'localforage';

export const useStorage = (storageName: string) => {
  const dbs = localforage;

  dbs.config({
    driver: [
      localforage.INDEXEDDB,
      localforage.WEBSQL,
      localforage.LOCALSTORAGE
    ],
    name: storageName
  });

  /**
   * Set item on storage
   *
   * @param key - { string }
   * @param value - { any }
   */
  const setItem = (key: string, value: any): Promise<any> =>
    dbs.setItem(key, value);

  /**
   * Get item from storage
   *
   * @param key - { string }
   */
  const getItem = (key: string): Promise<any> => dbs.getItem(key);

  /**
   * Remove item from storage
   *
   * @param key - { string }
   */
  const removeItem = (key: string): Promise<any> => dbs.removeItem(key);

  return {
    getItem,
    removeItem,
    setItem
  };
};
