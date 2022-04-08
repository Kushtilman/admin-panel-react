import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import './header.scss';
import {logout} from "../../services/api-service";

const Header = () => {

  const userLogin = localStorage.getItem('accessToken');
  let navigate = useNavigate();

  const handleLogout = async () => {
    await logout('admin/sign-out').then(() => {
      try {
        localStorage.removeItem('accessToken');
        navigate('/login');
      } catch (e) {
        console.log(e.response?.error?.message)
      }
    })
  };

  const redirectIsLogout = () => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  }

  return (
    <header className='header'>
      <div className="container">
        <div className='row'>
          <div className="col-10 nav-bar">
            {userLogin
              ? <Link to="/login" onClick={handleLogout}>Logout</Link>
              : <Link to="/login" onClick={redirectIsLogout}>Login</Link>
            }
            <Link to="/user-list">User list</Link>
            <Link to="/create-user">Create new User</Link>
          </div>
          <div className="col-2 admin-info">
            <Link to="/admin-info">Admin info</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
