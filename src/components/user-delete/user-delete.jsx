import React from 'react';
import PropTypes from 'prop-types';
import './user-delete.scss';

const UserDelete = ({setModal, removeUser, user}) => {
  return (
    <>
      <h3>Delete user</h3>
      <span className='question'>Do you want delete this user?</span>
      <div>
        <button onClick={() => setModal(false)} className="btn btn-secondary">Back</button>
        <button onClick={() => removeUser(user.id)} className="btn btn-primary">Delete</button>
      </div>
    </>
  );
};

UserDelete.propTypes = {
  user: PropTypes.object,
  removeUser: PropTypes.func,
  setModal: PropTypes.func,
};

export default UserDelete;
