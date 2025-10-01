import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Car,
  DollarSign,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronUp,
  Menu,
  Target,
  Handshake,
  Shield,
  CheckCircle,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/stores/dashboardStore";
import { cn } from "@/lib/utils";
import logoImage from "../../assets/logo.png";

interface NavigationItem {
  name: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: { name: string; href: string }[];
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard }, 
  { name: "Map", href: "/map", icon: Map },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Shared Platform", href: "/shared-platform", icon: Users },
  { name: "Cleared Bookings", href: "/cleared-bookings", icon: CheckCircle },
  {
    name: "Clients",
    icon: Users,
    children: [
      { name: "Corporate", href: "/clients/corporate" },
      { name: "Individual", href: "/clients/individual" },
      { name: "Subcontractor", href: "/clients/subcontractor" },
    ],
  },
  {
    name: "Drivers",
    icon: Car,
    children: [
      { name: "Fleet Driver", href: "/drivers/fleet" },
      { name: "Fleet Vehicle", href: "/drivers/fleet-vehicle" },
      { name: "Owner Driver", href: "/drivers/owner" },
      { name: "Subcontractor", href: "/drivers/subcontractor" },
    ],
  },
  {
    name: "CRM",
    icon: Target,
    children: [{ name: "Salesman Summary", href: "/crm/salesman-summary" }],
  },
  {
    name: "Finance",
    icon: DollarSign,
    children: [
      { name: "Finance Report", href: "/finance/report" },
      { name: "Invoice Summary", href: "/finance/invoice-summary" },
      { name: "Archived Invoice", href: "/finance/archived" },
      { name: "Generate Invoice", href: "/finance/generate" },
      { name: "Payment Link Summary", href: "/finance/payment-link" },
      { name: "Driver Payment Summary", href: "/finance/driver-payment" },
      { name: "Refund Summary", href: "/finance/refunds" },
    ],
  },
  {
    name: "Affiliate",
    icon: Handshake,
    children: [{ name: "Affiliate List", href: "/affiliate/list" }],
  },
  {
    name: "Compliance",
    icon: Shield,
    children: [
      { name: "TFL Report Summary", href: "/compliance/tfl-report" },
      { name: "Service Failure Reports", href: "/compliance/service-failure" },
      { name: "Complaints", href: "/compliance/complaints" },
      { name: "Lost Property", href: "/compliance/lost-property" },
      { name: "TFL Staff Register", href: "/compliance/tfl-staff" },
      { name: "London TFL Weekly Report", href: "/compliance/london-tfl-weekly" },
    ],
  },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/setting", icon: Settings },
];

const Sidebar: React.FC = () => {
  const {
    sidebarOpen,
    toggleSidebar,
    sidebarCollapsed,
    toggleSidebarCollapse,
    sidebarWidth,
  } = useDashboardStore();

  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = useCallback((name: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [name]
    );
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setOpenDropdowns([]);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarCollapsed && openDropdowns.length > 0) {
        const target = event.target as HTMLElement;
        const sidebar = document.querySelector('[aria-label="Sidebar navigation"]');
        if (sidebar && !sidebar.contains(target)) {
          closeAllDropdowns();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sidebarCollapsed, openDropdowns, closeAllDropdowns]);

  useEffect(() => {
    const newWidth = sidebarCollapsed ? 64 : 240;
    useDashboardStore.getState().setSidebarWidth(newWidth);

    if (!sidebarCollapsed) {
      setOpenDropdowns([]);
    }
  }, [sidebarCollapsed]);

  // Calculate available space for dropdowns to prevent overflow
  const getDropdownMaxHeight = useCallback(() => {
    if (typeof window === 'undefined') return 200;
    
    const viewportHeight = window.innerHeight;
    const sidebarTop = 64; // header height
    const padding = 16; // extra padding
    
    return Math.min(viewportHeight - sidebarTop - padding, 300);
  }, []);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-800 dark:bg-gray-700 transition-all duration-300 md:translate-x-0 overflow-visible shadow-sm border-r border-gray-300 dark:border-gray-600"
        )}
        style={{ width: `${sidebarWidth}px` }}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center h-16 px-4 border-b border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-3 min-w-0 w-full">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={logoImage}
                alt="NEWLINE Logo"
                className="h-full w-full object-contain"
              />
            </div>

            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-bold text-white">NEWLINE</h4>
                <h5 className="text-xs font-medium text-gray-100">
                  Transport Company
                </h5>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebarCollapse}
              className={cn(
                "h-8 w-8 p-0 hover:bg-[#FEE282] dark:hover:bg-[#FEE282] flex-shrink-0 transition-all duration-300",
                sidebarCollapsed ? "ml-5" : "ml-auto"
              )}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="h-7 w-7 text-gray-400" />
            </Button>
          </div>
        </div>

        <nav
          className={cn(
            "flex-1 py-4 space-y-1 overflow-y-auto scrollbar-hide",
            sidebarCollapsed ? "px-2" : "px-3"
          )}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              const isOpen = openDropdowns.includes(item.name);
              return (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={cn(
                      "flex items-center w-full gap-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                      sidebarCollapsed
                        ? "px-2 py-2 justify-center"
                        : "px-3 py-2",
                      "text-white hover:bg-yellow-200 dark:hover:bg-yellow-900/20 hover:text-gray-900 dark:hover:text-yellow-400"
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`dropdown-${item.name}`}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    {Icon && (
                      <Icon
                        className="h-5 w-5 flex-shrink-0 text-white"
                        aria-hidden="true"
                      />
                    )}
                    {!sidebarCollapsed && (
                      <span className="flex-1 text-left">{item.name}</span>
                    )}
                    {!sidebarCollapsed &&
                      (isOpen ? (
                        <ChevronUp className="h-4 w-4 ml-auto text-gray-100" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-auto text-gray-100" />
                      ))}
                  </button>

                  {isOpen && (
                    <div
                      id={`dropdown-${item.name}`}
                      className={cn(
                        "sidebar-dropdown rounded-md shadow-lg z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800",
                        sidebarCollapsed
                          ? "fixed left-full ml-2 py-1 bg-gray-800 dark:bg-gray-700"
                          : "ml-6 mt-1 relative py-1 bg-gray-700/50 dark:bg-gray-600/50"
                      )}
                      style={{
                        ...(sidebarCollapsed
                          ? {
                              left: `${sidebarWidth + 8}px`,
                              maxHeight: `${getDropdownMaxHeight()}px`,
                              width: "160px", // Reduced width for collapsed sidebar
                              minWidth: "auto",
                            }
                          : {
                              maxHeight: `${getDropdownMaxHeight()}px`,
                              width: "calc(100% - 24px)", // Reduced width to prevent overflow
                              maxWidth: "180px", // Further reduced maximum width
                              minWidth: "140px", // Minimum width for readability
                            }),
                      }}
                    >
                      {item.children.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.href}
                          className={({ isActive }) =>
                            cn(
                              "block px-3 py-1.5 text-xs transition-all rounded-md truncate overflow-hidden", // Improved text handling
                              isActive
                                ? "bg-yellow-100 dark:bg-yellow-900/20 text-gray-900 dark:text-yellow-400 font-medium"
                                : "text-white hover:bg-yellow-100 dark:hover:bg-yellow-900/20 hover:text-gray-900 dark:hover:text-yellow-400"
                            )
                          }
                          onClick={() => sidebarCollapsed && closeAllDropdowns()}
                          title={sub.name} // Tooltip for truncated text
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.href!}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 text-sm font-medium rounded-lg transition-all duration-200 group relative",
                    sidebarCollapsed
                      ? "px-2 py-2 justify-center"
                      : "px-3 py-2",
                    isActive
                      ? "bg-[#FEE282] dark:bg-yellow-900/20 text-gray-900 dark:text-yellow-400 shadow-sm border-r-2 border-yellow-500"
                      : "text-white hover:bg-yellow-200 dark:hover:bg-yellow-900/20 hover:text-gray-900 dark:hover:text-yellow-400"
                  )
                }
                title={sidebarCollapsed ? item.name : undefined}
              >
                {({ isActive }) => (
                  <>
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-[#FEE282]"
                        )}
                      />
                    )}
                    {!sidebarCollapsed && <span className="flex-1">{item.name}</span>}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;