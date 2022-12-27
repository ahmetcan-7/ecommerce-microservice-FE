export const setToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: any) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};
