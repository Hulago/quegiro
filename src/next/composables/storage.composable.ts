import localforage from 'localforage';
import { unref } from 'vue';

const db = localforage;

export const useStorage = () => {
  const setup = (name: string) => {
    db.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
      ],
      name: name
    });
  };

  /**
   * Set item on storage
   *
   * @param key - { string }
   * @param value - { any }
   */
  const setItem = (key: string, value: any): Promise<any> => {
    return db.setItem(key, JSON.parse(JSON.stringify(unref(value))));
  };

  /**
   * Get item from storage
   *
   * @param key - { string }
   */
  const getItem = async (key: string): Promise<any> => {
    return db.getItem(key);
  };

  /**
   * Remove item from storage
   *
   * @param key - { string }
   */
  const removeItem = (key: string): Promise<any> => db.removeItem(key);

  return {
    setup,
    getItem,
    removeItem,
    setItem
  };
};
