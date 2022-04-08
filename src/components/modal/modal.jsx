import React from 'react';
import st from './modal.module.scss';

const Modal = ({children, visible, setVisible, user, removeUser, modalAttributes}) => {
  const rootClass = [st.modal]

  if (visible) {
    rootClass.push(st.active)
  }

  return (
    <div className={rootClass.join(' ')} onClick={() => setVisible(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className={st.content}>
          {children}
          <h3>{modalAttributes.title}</h3>
          <span className={st.modalContent}>{modalAttributes.description}</span>
          <div>
            <button onClick={() => setVisible(false)} className="btn btn-secondary">Back</button>
            <button onClick={() => removeUser(user.id)} className="btn btn-primary">{modalAttributes.btnActive}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;