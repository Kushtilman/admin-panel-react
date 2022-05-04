import React, {useEffect, useState} from 'react';
import {viewUser} from '../../services/api-service';
import Loading from '../loading/loading';
import {useParams} from 'react-router-dom';

import './user-view.scss';

const UserView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    viewUser(`admin/${params.id}`)
      .then((data) => {
        setUser(data.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {isLoading ?
        <Loading/> :
        <div>
          <h2>User information:</h2>
          <ul className="user-info">
            <li>id: {user.id}</li>
            <li>user name: {user.userName}</li>
            <li>email: {user.email}</li>
          </ul>
        </div>
      }
    </div>
  );
};

export default UserView;
