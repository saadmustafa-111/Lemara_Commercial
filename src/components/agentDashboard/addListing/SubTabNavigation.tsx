import React from 'react';

interface Section {
  id: string;
  label: string;
  icon: string;
}

interface SubTabNavigationProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  scrollToSection: (sectionId: string) => void;
  sections: Section[];
}

const SubTabNavigation: React.FC<SubTabNavigationProps> = ({
  activeSection,
  setActiveSection,
  scrollToSection,
  sections
}) => {  return (
    <nav className="fixed top-18 left-75 right-0 z-50 bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 shadow-md">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              scrollToSection(section.id);
            }}            className={`px-3 py-2 whitespace-nowrap rounded-full transition-colors flex items-center ${
              activeSection === section.id
                ? 'bg-[#06AED7] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SubTabNavigation;
