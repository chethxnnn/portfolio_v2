import { createContext, useContext, useState } from 'react';

const NavContext = createContext({
  pinnedSections: [],
  setPinnedSections: () => {},
  viewMode: 'professional',
  setViewMode: () => {},
});

export const NavProvider = ({ children }) => {
  const [pinnedSections, setPinnedSections] = useState([]);
  const [viewMode, setViewMode] = useState('professional');
  
  return (
    <NavContext.Provider value={{ pinnedSections, setPinnedSections, viewMode, setViewMode }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);
