import React from 'react';
import st from './modal.module.scss';
import PropTypes from 'prop-types';

const Modal = ({children, visible, setVisible}) => {
  const rootClass = [st.modal];
  if (visible) {
    rootClass.push(st.active);
  }

  return (
    <div className={rootClass.join(' ')} onClick={() => setVisible(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className={st.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

export default Modal;
