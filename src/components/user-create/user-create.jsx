import React, {useEffect, useState} from 'react';
import {createUser, editUser, viewUser} from '../../services/api-service';
import {useNavigate, useParams} from 'react-router-dom';

import './user-create.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UserCreate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [userNameDirty, setUserNameDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email не должен быть пустым!');
  const [passwordError, setPasswordError] = useState('Password не должен быть пустым!');
  const [userNameError, setUserNameError] = useState('Поле User Name не может быть пустым!');
  const [formValid, setFormValid] = useState(false);
  const params = useParams();

  const navigate = useNavigate();

  const isCreate = window.location.href.includes('create-user');

  useEffect(() => {
    if (emailError || userNameError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, userNameError]);

  useEffect(() => {
    if (!isCreate) {
      viewUser(`admin/${params.id}`)
        .then((data) => {
          const res = data.data;
          setEmail(res.email);
          setUserName(res.userName);
        });
    }
  }, []);

  // form validation start
  const emailHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(value).toLowerCase())) {
      setEmailError('Некорректный email!');
    } else {
      setEmailError('');
    }
  };

  const userNameHandler = (e) => {
    const value = e.target.value;
    setUserName(value);
    if (value.length < 6 || value.length > 10) {
      setUserNameError('User name должен быть не меньше 6 и не больше 10 символов!');
      if (!value) {
        setUserNameError('Поле User name не должен быть пустым!');
      }
    } else {
      setUserNameError('');
    }
  };

  const passwordHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6 || value.length > 10) {
      setPasswordError('Password должен быть не меньше 6 и не больше 10 символов!');
      if (!value) {
        setPasswordError('Password не должен быть пустым!');
      }
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'userName':
        setUserNameDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };
  // form validation end

  // create user
  const addUser = (e) => {
    e.preventDefault();

    createUser('admin', userName, email, password)
      .then(() => navigate('/user-list'));
  };

  // edit user
  const editThisUser = (e) => {
    e.preventDefault();

    editUser(`admin/${params.id}`, userName, email, password)
      .then(() => navigate('/user-list'));
  };

  return (
    <div className="container">
      <Form onSubmit={isCreate ? addUser : editThisUser} className="create-form" autoComplete="off">
        {isCreate ?
          <h2>Create user</h2> :
          <h2>Edit user</h2>
        }
        <Form.Group size="lg" controlId="email" className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => emailHandler(e)}
            onBlur={(e) => blurHandler(e)}
          />

          {(emailError && emailDirty) && <span className="input-error">{emailError}</span>}
        </Form.Group>

        <Form.Group size="lg" controlId="userName" className="form-group">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            name="userName"
            value={userName}
            onChange={(e) => userNameHandler(e)}
            onBlur={(e) => blurHandler(e)}
          />

          {(userNameError && userNameDirty) && <span className="input-error">{userNameError}</span>}
        </Form.Group>

        <Form.Group size="lg" controlId="password" className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e) => passwordHandler(e)}
            onBlur={(e) => blurHandler(e)}
          />

          {(passwordError && passwordDirty) && <span className="input-error">{passwordError}</span>}
        </Form.Group>

        <Button size="md" type="submit" disabled={!formValid}>
          {isCreate ? 'Add User' : 'Edit User'}
        </Button>
      </Form>
    </div>
  );
};

export default UserCreate;
