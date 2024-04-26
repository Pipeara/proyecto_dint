import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Context from '../contexts/Context';
import dint from '../assets/images/dint.png'; 
import './Navigation.css'

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const logout = () => {
    setDeveloper(null);
    window.sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-navbar" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src={dint}
            height="75"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Link to='/home' className={`nav-link nav-link-custom ${location.pathname === '/home' ? 'active' : ''}`}>Home</Link>
            <Link to='/about' className={`nav-link nav-link-custom ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            <Link to='/admin' className={`nav-link nav-link-custom ${location.pathname === '/admin' ? 'active' : ''}`}>Admin</Link>
          </Nav>
          {!getDeveloper && (
            <Nav className="ml-auto">
              <Link to='/registrarse' className='btn  register-btn'>Registrarse</Link>
              <Link to='/login' className='btn login-btn'>Iniciar Sesión</Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;