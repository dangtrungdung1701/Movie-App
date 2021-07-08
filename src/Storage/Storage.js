const PAGES_STORAGE_KEY = "PAGES-KEY";

function get() {
  return JSON.parse(localStorage.getItem(PAGES_STORAGE_KEY)) || 1;
}
function set(page) {
  localStorage.setItem(PAGES_STORAGE_KEY, page);
}
const Store = { get, set };
export default Store;
