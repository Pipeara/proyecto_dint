import React, { useContext, useEffect } from 'react';
import Context from '../contexts/Context';
import { ENDPOINT } from '../config/constans.js';
import backgroundImage from '../assets/images/IMG_8416.jpg';
const Home = () => {
  const { setDeveloper } = useContext(Context);

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(ENDPOINT.users, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(data => setDeveloper(data[0]))
        .catch(() => {
          window.sessionStorage.removeItem('token');
          setDeveloper(null);
        });
    }
  };

  useEffect(getDeveloperData, []);

  return (
    <div className='py-5' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>
    <div className='card' style={{ color: 'white', fontSize: '2.5em', padding: '1rem', maxWidth: '500px', margin: '0 auto', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '20', left: '45%', transform: 'translateX(-50%)', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '19px' }}>
      <h1>
        Welcome to <span className='fw-bold'>Dint</span>
      </h1>
      <h4>
        International dubbing house <br />
        with over 30 years of experience
      </h4>
    </div>
  </div>
  );
};

export default Home;