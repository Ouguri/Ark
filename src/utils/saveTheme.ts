export const setTheme = (theme: any) => {
  localStorage.setItem("THEME", theme);
};

export const getTheme = () => {
  return localStorage.getItem("THEME");
};
