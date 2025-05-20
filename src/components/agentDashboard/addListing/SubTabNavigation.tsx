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
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 px-4 py-3 flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex space-x-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              scrollToSection(section.id);
            }}
            className={`px-4 py-2 whitespace-nowrap rounded-md transition-colors flex items-center ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
