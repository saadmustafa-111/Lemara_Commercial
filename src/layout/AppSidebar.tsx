"use client"
import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSidebar } from "../context/SidebarContext"
import { useAuth } from "../context/AuthContext"
import {
  LayoutGrid,
  List,
  Users,
  FileText,
  User,
  Mail,
  Settings,
  Banknote,
  Wallet,
  UserPlus,
  Contact,
  ChevronLeft,
  ChevronRight,
  
} from "lucide-react"
import {
  ChevronDownIcon,
  EnvelopeListIcon,
  GridIcon,
  ListIcon,
  PaperPlaneIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index"
import SidebarWidget from "./SidebarWidget"

// Define the type for navigation items
type NavItem = {
  name: string
  icon: React.ReactNode
  path?: string
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[]
}

// Common navigation items for all roles
const commonNavItems: NavItem[] = []

// Admin-specific navigation items
const adminNavItems: NavItem[] = [
  {
    icon: <LayoutGrid size={20} />,
    name: "Dashboard",
    path:'/dashboard/admin',

  },  {
    name: "Commercial Listings",
    icon: <List size={20} />,
    path: "/dashboard/admin/commercial-listings",
  },  {
    name: "MLS Listings",
    icon: <FileText size={20} />,
    path: "/dashboard/admin/mls-listings",
  },
  {
    name: "Agents",
    icon: <Users size={20} />,
path: "/dashboard/admin/agents"
  },
  {
    name: "Clients",
    icon: <User size={20} />,
    path: "/dashboard/admin/clients",
  },
  {
    name: "Contacts",
    icon: <Mail size={20} />,
    path: "/dashboard/admin/contacts",
  },
  {
    name: "OverView",
    icon: <Settings size={20} />,
    path: "/dashboard/admin/overview",
  },
  {
    name: "Commercial Loans",
    icon: <Banknote size={20} />,
    path: "/dashboard/admin/commercial",
  },
  {
    name: "Commercial Loans-Offline",
    icon: <Wallet size={20} />,
    path: "/dashboard/admin/commOffline",
  },
  {
    name: "Documents Library",
    icon: <FileText size={20} />,
    path: "/dashboard/admin/document",
  },
  {
    name: "Team Members",
    icon: <UserPlus size={20} />,
    path: "/dashboard/admin/team",
  },
]

// Teacher-specific navigation items
const teacherNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
     path: "/dashboard/teacher"
  },
  {
    icon: <GridIcon />,
    name: "Commercial Loans",
   path: "/dashboard/teacher"
  }
]

// Student-specific navigation items
const studentNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/dashboard/agent",
  },
  {
    name: "My Listings",
    icon: <ListIcon />,
    path: "/dashboard/listings",
  },
  ...commonNavItems,
  {
    name: "My Contacts",
    icon: <Contact />,
    path: "/dashboard/agent/mycontacts",
  },
  {
    name: "Profile",
    icon: <UserCircleIcon />,
    path: "/dashboard/account/profile",
  },
  {
    name: "Reminders",
    icon: <TableIcon />,
    path: "/dashboard/agent/reminders",
  },
  {
    name: "Email Lists",
    icon: <EnvelopeListIcon />,
    path: "/dashboard/email-lists",
  },
  {
    name: "Email Campaigns",
    icon: <PaperPlaneIcon />,
    path: "/dashboard/email-campaigns",
  },
  {
    name: "PipeLines Management",
    icon: <FileText />,
    path: "/dashboard/agent/pipeline",
  },
]

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, toggleSidebar } = useSidebar()
  const { user } = useAuth()
  const pathname = usePathname()
  const [navItems, setNavItems] = useState<NavItem[]>([])

  // Determine which navigation items to show based on user role
  useEffect(() => {
    if (user) {
      const role = user.role.toLowerCase()
      if (role === "admin") {
        setNavItems(adminNavItems)
      } else if (role === "teacher") {
        setNavItems(teacherNavItems)
      } else if (role === "broker" || role === "agent") {
        setNavItems(studentNavItems)
      } else {
        // Default to common items if role is not recognized
        setNavItems(commonNavItems)
      }
    } else {
      // No user logged in, show minimal items
      setNavItems([])
    }
  }, [user])

  const renderMenuItems = (navItems: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group bg-transparent text-white dark:text-white transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-white/25 dark:bg-white/15 shadow-lg"
                  : "hover:bg-white/15 dark:hover:bg-white/10 hover:shadow-md"
              } cursor-pointer rounded-lg p-3 ${!isExpanded ? "lg:justify-center" : "lg:justify-start"}`}
            >
              <span
                className={`text-white transition-all duration-300 ease-in-out ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-white scale-110"
                    : "text-white group-hover:scale-105"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isMobileOpen) && (
                <span
                  className={`menu-item-text font-medium text-sm tracking-wide transition-all duration-300 ease-in-out group-hover:font-semibold`}
                >
                  {nav.name}
                </span>
              )}
              {(isExpanded || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-all duration-300 ease-in-out text-white group-hover:scale-110 ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group bg-transparent text-white dark:text-white transition-all duration-300 ease-in-out transform hover:scale-[1.02] rounded-lg p-3 ${
                  isActive(nav.path)
                    ? "bg-white/25 dark:bg-white/15 shadow-lg"
                    : "hover:bg-white/15 dark:hover:bg-white/10 hover:shadow-md"
                }`}
              >
                <span
                  className={`text-white transition-all duration-300 ease-in-out ${
                    isActive(nav.path) ? "text-white scale-110" : "text-white group-hover:scale-105"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isMobileOpen) && (
                  <span
                    className={`text-white font-medium text-sm tracking-wide transition-all duration-300 ease-in-out group-hover:font-semibold`}
                  >
                    {nav.name}
                  </span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el
              }}
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
                opacity: openSubmenu?.type === menuType && openSubmenu?.index === index ? 1 : 0,
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item transition-all duration-300 ease-in-out hover:scale-[1.01] font-medium text-sm tracking-wide ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive hover:bg-white/10 hover:pl-4"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto transition-all duration-300 ease-in-out hover:scale-105 ${
                              isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge font-semibold text-xs`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto transition-all duration-300 ease-in-out hover:scale-105 ${
                              isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge font-semibold text-xs`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  )

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others"
    index: number
  } | null>(null)
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const isActive = useCallback((path: string) => path === pathname, [pathname])

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false
    ;["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : []
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              })
              submenuMatched = true
            }
          })
        }
      })
    })

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null)
    }
  }, [pathname, isActive, navItems])

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }))
      }
    }
  }, [openSubmenu])

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null
      }
      return { type: menuType, index }
    })
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bg-[#00a0d1] dark:bg-gray-800 text-white h-screen z-50 dark:border-gray-700 shadow-xl
          transition-all duration-300 ease-in-out transform
          ${isExpanded || isMobileOpen ? "w-[290px]" : "w-[90px]"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header with Logo and Toggle Button */}
        <div
          className={`flex items-center bg-white/95 backdrop-blur-md dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
            !isExpanded && !isMobileOpen ? "justify-center px-4 py-3" : "justify-between px-6 py-3"
          }`}
        >
          {/* Logo - Only show when expanded */}
          {(isExpanded || isMobileOpen) && (
            <Link href="/" className="transition-transform duration-300 ease-in-out hover:scale-105">
              <Image
                className="dark:hidden transition-opacity duration-300 ease-in-out hover:opacity-90"
                src="/images/logo/lemaraLogo.png"
                alt="Logo"
                width={140}
                height={30}
              />
              <Image
                className="hidden dark:block transition-opacity duration-300 ease-in-out hover:opacity-90"
                src="/images/logo/lemaraLogo.png"
                alt="Logo"
                width={140}
                height={30}
              />
            </Link>
          )}

          {/* Beautiful Toggle Button - Always visible, centered when collapsed */}
          <button
            onClick={toggleSidebar}
            className={`group relative flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00a0d1] to-[#0088b3] hover:from-[#0088b3] hover:to-[#006b8a] text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#00a0d1] ${
              !isExpanded && !isMobileOpen ? "w-11 h-11" : "w-9 h-9"
            }`}
            aria-label="Toggle Sidebar"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />

            {/* Icon with smooth rotation */}
            <div className="relative z-10 transition-transform duration-300 ease-in-out">
              {isExpanded || isMobileOpen ? (
                <ChevronLeft size={18} className="transform group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <ChevronRight size={20} className="transform group-hover:scale-110 transition-transform duration-200" />
              )}
            </div>

            {/* Ripple effect on click */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-white/30 transform scale-0 group-active:scale-100 transition-transform duration-200 ease-out rounded-xl" />
            </div>

            {/* Subtle pulse animation when collapsed */}
            {!isExpanded && !isMobileOpen && (
              <div className="absolute inset-0 rounded-xl border-2 border-white/20 animate-pulse opacity-30" />
            )}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar px-5">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div className="pt-4">{renderMenuItems(navItems, "main")}</div>
            </div>
          </nav>
          {(isExpanded || isMobileOpen) && <SidebarWidget />}
        </div>

        {/* Beautiful Toggle Button for Collapsed State - Bottom Position */}
      </aside>
    </>
  )
}

export default AppSidebar
