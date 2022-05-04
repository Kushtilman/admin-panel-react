import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {getAuthAdmin, login} from '../../services/api-service';

import './login.scss';
import {MeContext} from '../context/app-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const adminState = useContext(MeContext);

  const navigate = useNavigate();
  // const location = useLocation();
  // const fromPage = location.state?.from.pathname || '/';
  // console.log(location);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login('admin/sign-in', email, password).then(async (response) => {
      setError('');
      try {
        if (response.error && response.error.code === 400) {
          setError(response.error.message);
          localStorage.removeItem('accessToken');
        } else {
          localStorage.setItem('accessToken', `bearer ${JSON.stringify(response.data.accessToken)}`);
          await getAuthAdmin('admin/me').then((response) => {
            adminState.handleAdmin(response);
          });
          navigate('/user-list');
        }
      } catch (e) {
        console.log(e.response?.error?.message);
      }
    });
  };

  return (
    <div className="login">
      <Form onSubmit={handleSubmit} autoComplete="off">
        <div className="block-error">
          <p>{error}</p>
        </div>
        <Form.Group size="lg" controlId="email" className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          size="md"
          type="submit"
          disabled={!validateForm()}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
