// src/context/UserProvider.jsx
// Provides global user context including role, locale, 
// and region; enables dynamic locale switching

import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  userRole: 'agent',
  userLocale: 'en',
  userRegion: 'NA',
  setUserLocale: () => {}, // optional toggle
});

export const UserProvider = ({ children }) => {
  const [userLocale, setUserLocale] = useState('en'); // 💬 dynamic locale

  const userState = {
    userRole: 'agent',
    userLocale,
    userRegion: 'NA',
    setUserLocale, // expose setter for toggling
  };

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};
