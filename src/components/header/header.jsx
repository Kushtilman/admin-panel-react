import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {logout} from '../../services/api-service';
import Modal from '../modal/modal';
import AdminInfo from '../admin-info/admin-info';
import './header.scss';

const Header = () => {
  const userLogin = localStorage.getItem('accessToken');
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout('admin/sign-out').then(() => {
      try {
        localStorage.removeItem('accessToken');
        navigate('/login');
      } catch (e) {
        console.log(e.response?.error?.message);
      }
    });
  };

  const redirectIsLogout = () => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-10 nav-bar">
            {userLogin ?
              <NavLink to="/login" onClick={handleLogout}>Logout</NavLink> :
              <NavLink to="/login" onClick={redirectIsLogout}>Login</NavLink>
            }
            <NavLink to="/user-list">User list</NavLink>
            <NavLink to="/create-user">Create new User</NavLink>
          </div>
          <div className="col-2 admin-info">
            <span className="admin" onClick={() => setModal(true)}>Admin info</span>
          </div>
        </div>
      </div>

      <Modal visible={modal} setVisible={setModal}>
        <AdminInfo/>
      </Modal>
    </header>
  );
};

export default Header;
