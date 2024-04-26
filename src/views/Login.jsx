// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  // Function to refresh the token
  const handleForm = async (event) => {
    event.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email and password are required.');
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('Invalid email format!');
    }

    try {
      const { data } = await axios.post(ENDPOINT.login, user);

      // Save the token, refresh token, and user's email in session storage
      window.sessionStorage.setItem('token', data.token);
      window.sessionStorage.setItem('refreshToken', data.refreshToken);
      window.sessionStorage.setItem('email', user.email);

      window.alert('User successfully identified 😀.');
      navigate('/profile');

      // Call refreshToken function here
      await refreshToken();
    } catch (error) {
      console.error(error);
      //window.alert('Not registered. Please register.');
    }
  };

  return (
    <div className="card col-12 col-sm-8 col-md-6 m-auto mt-5">
      <div className="card-body" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
        <img src="/src/img/dint.png" alt="Logo" style={{ position: 'absolute', top: '10px', left: '10px', height: '50px' }} />
        <form onSubmit={handleForm} style={{ padding: '20px' }}>
          <h1>Login</h1>
          <hr />
          <div className="form-group mt-1">
            <input
              value={user.email}
              onChange={handleUser}
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-1">
            <input
              value={user.password}
              onChange={handleUser}
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-light mt-3">
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;