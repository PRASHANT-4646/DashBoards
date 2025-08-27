'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboardIcon,
  Star,
  Wallet,
  CreditCard,
  Users,
  UserPlus,
  UserCog,
  UserCheck,
  FileText,
  PlusSquare,
  BadgeDollarSign,
} from 'lucide-react';

type SubItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
};

type MenuItem = {
  title: string;
  icon?: React.ReactNode;
  children?: SubItem[];
};

const menuItems: MenuItem[] = [
  {
    title: 'Admins',
    icon: <UserCog className="w-4 h-4" />,
    children: [
      { title: 'All Admins', href: '/admins', icon: <Users className="w-4 h-4" /> },
      { title: 'Create Admin', href: '/admins/create', icon: <UserPlus className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Users',
    icon: <UserCheck className="w-4 h-4" />,
    children: [
      { title: 'All Users', href: '/users', icon: <Users className="w-4 h-4" /> },
      { title: 'Invite User', href: '/users/invite', icon: <UserPlus className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Leads',
    icon: <FileText className="w-4 h-4" />,
    children: [
      { title: 'All Leads', href: '/leads', icon: <FileText className="w-4 h-4" /> },
      { title: 'New Lead', href: '/leads/new', icon: <PlusSquare className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Plans',
    icon: <CreditCard className="w-4 h-4" />,
    children: [
      { title: 'Current Plans', href: '/plans', icon: <CreditCard className="w-4 h-4" /> },
      { title: 'Upgrade Plan', href: '/plans/upgrade', icon: <BadgeDollarSign className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Features',
    icon: <Star className="w-4 h-4" />,
    children: [
      { title: 'All Features', href: '/features', icon: <Star className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Credits',
    icon: <Wallet className="w-4 h-4" />,
    children: [
      { title: 'View Credits', href: '/credits', icon: <Wallet className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Payments',
    icon: <CreditCard className="w-4 h-4" />,
    children: [
      { title: 'Payment History', href: '/payments', icon: <CreditCard className="w-4 h-4" /> },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname.startsWith('/dashboard' + href);

  return (
    <aside className="h-screen w-64 border-r bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col p-5">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6 gap-2 text-gray-800 dark:text-gray-200 text-xl font-bold">
        <LayoutDashboardIcon className="w-6 h-6" />
        <span>Dashboard</span>
      </div>

      {/* Menu Section */}
      <nav className="flex-1">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
          Main Menu
        </p>

        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isOpen = openMenus.includes(item.title);
            return (
              <li key={item.title}>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </span>
                  {item.children &&
                    (isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>

                <div
                  className={`ml-3 mt-1 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.children?.map((sub) => (
                    <Link
                      key={sub.href}
                      href={`/dashboard${sub.href}`}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-colors ${
                        isActive(sub.href)
                          ? 'bg-indigo-100 dark:bg-indigo-700 text-indigo-900 dark:text-white font-semibold'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {sub.icon}
                      {sub.title}
                    </Link>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
