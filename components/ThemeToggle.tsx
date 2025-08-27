'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
    applyTheme(saved);
    if (saved === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme('system');
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    }
  }, []);

  const applyTheme = (mode: 'light' | 'dark' | 'system') => {
    setTheme(mode);
    localStorage.setItem('theme', mode);
    const root = document.documentElement;
    if (mode === 'light') root.classList.remove('dark');
    else if (mode === 'dark') root.classList.add('dark');
    else root.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg border border-gray-200 dark:border-gray-600">
      <button
        onClick={() => applyTheme('light')}
        className={`p-2 rounded-md transition ${
          theme === 'light' ? 'bg-white dark:bg-gray-600 shadow text-yellow-500' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        title="Light"
      >
        <Sun size={16} />
      </button>
      <button
        onClick={() => applyTheme('dark')}
        className={`p-2 rounded-md transition ${
          theme === 'dark' ? 'bg-white dark:bg-gray-600 shadow text-blue-400' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        title="Dark"
      >
        <Moon size={16} />
      </button>
      <button
        onClick={() => applyTheme('system')}
        className={`p-2 rounded-md transition ${
          theme === 'system' ? 'bg-white dark:bg-gray-600 shadow text-green-400' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        title="System"
      >
        <Monitor size={16} />
      </button>
    </div>
  );
}
