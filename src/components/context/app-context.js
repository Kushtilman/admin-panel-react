import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MeContext = React.createContext();

const AppContext = ({children}) => {
  const [admin, setAdmin] = useState('');

  const handleAdmin = (value) => {
    setAdmin(value);
  };

  return (
    <MeContext.Provider value={{handleAdmin, admin}}>
      {children}
    </MeContext.Provider>
  );
};

AppContext.propTypes = {
  children: PropTypes.element.isRequired,
};

export {MeContext};
export default AppContext;
