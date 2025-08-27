'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Topbar() {
  const pathname = usePathname();
  const title = useMemo(() => {
    const last = pathname.split('/').filter(Boolean).pop() || 'Dashboard';
    return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' ');
  }, [pathname]);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
