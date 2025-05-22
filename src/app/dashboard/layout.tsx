"use client";
import Sidebar from "../../layout/AppSidebar";
import Header from "../../layout/AppHeader";
import { useSidebar } from "@/context/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for sidebar-aware content spacing
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen w-full dark:bg-gray-900 flex flex-col">
      {/* Header (Full width, fixed to top) */}
      <Header />

      {/* Layout below the header */}
      <div className="flex flex-row flex-1">
  {/* Sidebar with top padding to offset the header */}
  <div className="pt-[72px]"> {/* Adjust this value based on your header height */}
    <Sidebar />
  </div>

  {/* Page Content Area */}
  <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
    <main className="p-4 md:p-6 overflow-x-hidden">{children}</main>
  </div>
</div>
    </div>
  );
}
