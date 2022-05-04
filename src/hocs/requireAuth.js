import React, {useContext, useEffect, useState} from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import {MeContext} from '../components/context/app-context';
import {getAuthAdmin} from '../services/api-service';
import PropTypes from 'prop-types';

const RequireAuth = ({children}) => {
  const authState = useContext(MeContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAuthAdmin('admin/me').then((response) => {
      authState.handleAdmin(response);
    }).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return null;

  if (!authState.admin.success) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RequireAuth;
