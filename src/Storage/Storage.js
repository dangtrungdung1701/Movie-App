const PAGES_STORAGE_KEY = "PAGES-KEY";

export default {
  get() {
    return JSON.parse(localStorage.getItem(PAGES_STORAGE_KEY)) || 1;
  },
  set(page) {
    localStorage.setItem(PAGES_STORAGE_KEY, page);
  },
};
