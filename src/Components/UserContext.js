import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [tc, setTc] = useState('');

  const login = (tcNumber) => {
    setTc(tcNumber);
  };

  const logout = () => {
    setTc('');
  };

  return (
    <UserContext.Provider value={{ tc, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
