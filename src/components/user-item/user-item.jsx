import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import UserDelete from '../user-delete/user-delete';
import './user-item.scss';

const UserItem = ({user, removeUser}) => {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  return (
    <tr className="user-item" user={user}>
      <td>{user.id}</td>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>
        <button
          onClick={() => navigate(`edit-user/${user.id}`)}
          className="btn btn-primary"
          type="button"
        >
          edit
        </button>

        <button
          onClick={() => setModal(true)}
          className="btn btn-danger"
          type="button"
        >
          delete
        </button>

        <button
          onClick={() => navigate(`${user.id}`)}
          className="btn btn-secondary"
          type="button"
        >view
        </button>

        <Modal visible={modal} setVisible={setModal}>
          <UserDelete
            removeUser={removeUser}
            setModal={setModal}
            user={user}
          />
        </Modal>
      </td>
    </tr>
  );
};

UserItem.propTypes = {
  user: PropTypes.object,
  removeUser: PropTypes.func,
};

export default UserItem;
