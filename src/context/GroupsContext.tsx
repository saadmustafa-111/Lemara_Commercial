import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface ContactGroup {
  id: number;
  title: string;
  contacts: number[];
}

interface ContactGroupsContextType {
  contactGroups: ContactGroup[];
  addGroup: (name: string) => void;
}

// Provide the default value for the context
const ContactGroupsContext = createContext<ContactGroupsContextType | undefined>(undefined);

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [contactGroups, setContactGroups] = useState<ContactGroup[]>([
    { id: 1, title: "VIP Clients", contacts: [1, 5, 9] },
    { id: 2, title: "Marketing Team", contacts: [2, 6, 10] },
  ]);

  const addGroup = (name: string) => {
    const newGroup = { id: contactGroups.length + 1, title: name, contacts: [] };
    setContactGroups([...contactGroups, newGroup]);
  };

  return (
    <ContactGroupsContext.Provider value={{ contactGroups, addGroup }}>
      {children}
    </ContactGroupsContext.Provider>
  );
};

export const useContactGroups = (): ContactGroupsContextType => {
  const context = useContext(ContactGroupsContext);
  if (!context) {
    throw new Error("useContactGroups must be used within a GroupContextProvider");
  }
  return context;
};