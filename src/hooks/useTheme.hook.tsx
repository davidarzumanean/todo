import {useEffect, useState} from "react";

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export const useThemeHook = () => {
  const [theme, setTheme] = useState<Theme>(Theme.light);

  useEffect(() => {
    if (theme === Theme.dark) {
      document.body.classList.add(Theme.dark);
    } else {
      document.body.classList.remove(Theme.dark);
    }
  }, [theme]);

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = () => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme as Theme);
    }
  }

  const toggleTheme = () => {
    if (theme === Theme.light) {
      setTheme(Theme.dark);
      localStorage.setItem('theme', Theme.dark);
    } else {
      setTheme(Theme.light);
      localStorage.setItem('theme', Theme.light);
    }
  }

  return {
    theme,
    toggleTheme,
  }
}