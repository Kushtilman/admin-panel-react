import React, {useState} from 'react';

const MeContext = React.createContext();

const AppContext = ({children}) => {
  const [admin, setAdmin] = useState('');

  const handleAdmin = (value) => {
    setAdmin(value)
  }

  return (
    <MeContext.Provider value={{handleAdmin, admin}}>
      {children}
    </MeContext.Provider>
  );
};

export {MeContext}
export default AppContext;