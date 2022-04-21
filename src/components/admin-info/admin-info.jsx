import React, {useContext} from 'react';
import {MeContext} from '../context/app-context';
import './admin-info.scss';

const AdminInfo = () => {

  const authState = useContext(MeContext);

  return (
    <div className="container">
      <span className="info">User Id: {authState.admin.data?.id}</span>
      <span className="info">User name: {authState.admin.data?.userName}</span>
      <span className="info">Email: {authState.admin.data?.email}</span>
    </div>
  );
};

export default AdminInfo;