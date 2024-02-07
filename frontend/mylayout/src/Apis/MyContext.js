// MyContext.js
import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [contextValue, setContextValue] = useState(false);

  const updateValue = () => {
    setContextValue(!contextValue);
  };

  return (
    <MyContext.Provider value={{ contextValue, updateValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
