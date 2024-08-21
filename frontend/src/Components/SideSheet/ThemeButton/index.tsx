import { useState, useEffect } from 'react';
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";

export const ThemeButton = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('theme', storedTheme); 
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  const handleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('theme', newTheme); 
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div>
      <button className="flex items-center gap-2 border-2 rounded-[25px] px-2 py-2" onClick={handleTheme} style={{ backgroundColor: 'bkgprim' }}>
        {theme === 'dark' ? <CiLight/> : <MdOutlineDarkMode/>}
      </button>
    </div>
  );
};