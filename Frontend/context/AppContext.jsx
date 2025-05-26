import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const value = {}; // 👈 अभी empty, बाद में state या functions add कर सकती हो

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
