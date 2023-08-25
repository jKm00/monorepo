import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const storedValue = browser ? window.localStorage.getItem(key) : null;
  const initValue = storedValue ? JSON.parse(storedValue) : defaultValue;

  const store = writable<T>(initValue);
  if (browser) {
    window.localStorage.setItem(key, initValue);
  }

  store.subscribe((value) => {
    if (browser) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return store;
};
