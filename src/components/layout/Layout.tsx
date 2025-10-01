import React, { useEffect } from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { sidebarOpen, sidebarWidth } = useDashboardStore();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div 
      className="flex h-screen w-full bg-background overflow-hidden"
      style={{ '--sidebar-width': `${sidebarWidth}px` } as React.CSSProperties}
    >
      <Sidebar />
      
      {/* Main content area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 overflow-hidden",
          sidebarOpen && "md:ml-[var(--sidebar-width)]",
          !sidebarOpen && "ml-0"
        )}
      >
        <TopBar />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;