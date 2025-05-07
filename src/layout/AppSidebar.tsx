"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import {
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

// Define the type for navigation items
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// Common navigation items for all roles
const commonNavItems: NavItem[] = [
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
];

// Admin-specific navigation items
const adminNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      { name: "Admin Overview", path: "/dashboard/admin", pro: false },
      { name: "Analytics", path: "/dashboard/admin/analytics", pro: false },
    ],
  },
  ...commonNavItems,
  {
    name: "Teachers Management",
    icon: <ListIcon />,
    subItems: [
      { name: "All Teachers", path: "/dashboard/admin/teachers", pro: false },
      { name: "Add Teacher", path: "/dashboard/admin/teachers/add", pro: false },
    ],
  },
  {
    name: "Students Management",
    icon: <TableIcon />,
    subItems: [
      { name: "All Students", path: "/dashboard/admin/students", pro: false },
      { name: "Add Student", path: "/dashboard/admin/students/add", pro: false },
    ],
  },
  {
    name: "Courses Management",
    icon: <PageIcon />,
    subItems: [
      { name: "All Courses", path: "/dashboard/admin/courses", pro: false },
      { name: "Add Courses", path: "/dashboard/admin/courses/add", pro: false },
    ],
  },
];

// Teacher-specific navigation items
const teacherNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Teacher Overview", path: "/dashboard/teacher", pro: false }],
  },
  ...commonNavItems,
  {
    name: "My Classes",
    icon: <ListIcon />,
    subItems: [{ name: "Class List", path: "/dashboard/teacher/classes", pro: false }],
  },
  {
    name: "My Students",
    icon: <TableIcon />,
    subItems: [{ name: "Student List", path: "/dashboard/teacher/students", pro: false }],
  },
  {
    name: "Attendance",
    icon: <PageIcon />,
    path: "/dashboard/teacher/attendance",
  },
  {
    name: "Assignments",
    icon: <ListIcon />,
    path: "/dashboard/teacher/assignments",
  },
];

// Student-specific navigation items
const studentNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Student Overview", path: "/dashboard/student", pro: false }],
  },
  ...commonNavItems,
  {
    name: "My Courses",
    icon: <ListIcon />,
    path: "/dashboard/student/courses",
  },
  {
    name: "Assignments",
    icon: <TableIcon />,
    path: "/dashboard/student/assignments",
  },
  {
    name: "Grades",
    icon: <PageIcon />,
    path: "/dashboard/student/grades",
  },
  {
    name: "Attendance",
    icon: <ListIcon />,
    path: "/dashboard/student/attendance",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { user } = useAuth();
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  // Determine which navigation items to show based on user role
  useEffect(() => {
    if (user) {
      const role = user.role.toLowerCase();
      if (role === 'admin') {
        setNavItems(adminNavItems);
      } else if (role === 'teacher') {
        setNavItems(teacherNavItems);
      } else if (role === 'student') {
        setNavItems(studentNavItems);
      } else {
        // Default to common items if role is not recognized
        setNavItems(commonNavItems);
      }
    } else {
      // No user logged in, show minimal items
      setNavItems([]);
    }
  }, [user]);

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
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
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : [];
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive, navItems]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/Zara_Z.png"
                alt="Logo"
                width={170}
                height={70}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/Zara_Z.png"
                alt="Logo"
                width={170}
                height={70}
              />
            </>
          ) : (
            <Image
              src="/images/logo/Zara_Z.png"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            {/* Commented out Others section
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
            */}
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
