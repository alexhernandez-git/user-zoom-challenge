import { useEffect, useState } from "react";

const useDarkTheme = () => {
  const [isDarkLoading, setIsDarkLoading] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // Check if is a saved configuration of the theme in local storage
      if ((await localStorage.getItem("theme")) === "dark") {
        setIsDark(true);
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
      setIsDarkLoading(false);
    })();
  }, []);
  const handleToggleIsDark = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };
  return { isDark, isDarkLoading, handleToggleIsDark };
};

export default useDarkTheme;
