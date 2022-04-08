import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import './user-item.scss';
import Modal from "../modal/modal";

const UserItem = ({user, removeUser}) => {

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const modalAttributes = {
    title: 'Delete user',
    description: 'Do you want delete this user?',
    btnActive: 'Delete'
  }

  return (
    <tr className='user-item' user={user}>
      <td>{user.id}</td>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>
        <button
          onClick={() => navigate(`edit-user/${user.id}`)}
          className='btn btn-primary'
          type='button'
        >edit
        </button>

        <button
          onClick={() => setModal(true)}
          className='btn btn-danger'
          type='button'
        >delete
        </button>

        <button
          onClick={() => navigate(`${user.id}`)}
          className='btn btn-secondary'
          type='button'
        >view
        </button>

        <Modal
          visible={modal}
          setVisible={setModal}
          user={user}
          removeUser={removeUser}
          modalAttributes={modalAttributes}
        />
      </td>
    </tr>
  );
};

export default UserItem;
