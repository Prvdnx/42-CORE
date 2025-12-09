import React, { createContext, useState, useContext } from 'react';

const OverlayContext = createContext();

export const useOverlay = () => useContext(OverlayContext);

export const OverlayProvider = ({ children }) => {
  const [overlayContent, setOverlayContent] = useState(null);

  const showOverlay = (content) => { setOverlayContent(() => content); };

  const hideOverlay = () => { setOverlayContent(null); };

  return (
    <OverlayContext.Provider value={{ showOverlay, hideOverlay }}>
      {children}
      {overlayContent}
    </OverlayContext.Provider>
  );
};
