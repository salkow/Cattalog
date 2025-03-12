const setDarkColorScheme = (): void => {
  localStorage.theme = 'dark';
  document.body.setAttribute('data-theme', 'dark');
  document.documentElement.classList.add('dark');
};

const setLightColorScheme = (): void => {
  localStorage.theme = 'light';
  document.body.setAttribute('data-theme', 'light');
  document.documentElement.classList.remove('dark');
};

export const initializeColorScheme = (): void => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage)
    && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setDarkColorScheme();
  } else {
    setLightColorScheme();
  }
};

export const toggleColorScheme = (): void => {
  if (localStorage.theme === 'dark') {
    setLightColorScheme();
  } else {
    setDarkColorScheme();
  }
};

export const removeDuplicates = <T extends Record<K, unknown>, K extends keyof T>
  (arr: T[], key: K = 'id' as K): T[] => {
  const seen = new Set<T[K]>();
  return arr.filter((obj) => {
    const identifier = obj[key];
    return seen.has(identifier) ? false : seen.add(identifier);
  });
};