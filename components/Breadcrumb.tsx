'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumb() {
  const segments = usePathname().split('/').filter(Boolean);

  return (
    <nav className="p-2 text-sm text-gray-600 dark:text-gray-300">
      <ol className="flex items-center space-x-2">
        <li><Link href="/dashboard" className="hover:text-gray-900 dark:hover:text-white font-medium">Main</Link></li>
        {segments.map((seg, i) => (
          <li key={i} className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <Link
              href={'/' + segments.slice(0, i + 1).join('/')}
              className={`capitalize ${i === segments.length - 1
                ? 'text-gray-900 dark:text-white font-semibold pointer-events-none'
                : 'hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {seg.replace(/-/g, ' ')}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
