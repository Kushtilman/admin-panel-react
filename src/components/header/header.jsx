import React, {useContext} from 'react';
import {NavLink, useNavigate, Link} from "react-router-dom";
import './header.scss';
import {logout} from "../../services/api-service";
import {MeContext} from "../context/app-context";

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

  const authState = useContext(MeContext);

  const btn = () => {
    console.log(authState)
  }

  return (
    <header className='header'>
      <div className="container">
        <div className='row'>
          <div className="col-10 nav-bar">
            {userLogin
              ? <NavLink to="/login" onClick={handleLogout}>Logout</NavLink>
              : <NavLink to="/login" onClick={redirectIsLogout}>Login</NavLink>
            }
            <NavLink to="/user-list">User list</NavLink>
            <NavLink to="/create-user">Create new User</NavLink>
          </div>
          <div className="col-2 admin-info">
            <NavLink to="/admin-info">Admin info</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
