import Breadcrumb from '@/components/Breadcrumb';
import SideBar from '@/components/sidebar';
import Topbar from '@/components/topbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admins and users management panel",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-white dark:bg-gray-800">
      {/* Sidebar */}
      <SideBar />

      {/* Content Area */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="px-6 py-4">
          <Breadcrumb />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </main>
  );
}
