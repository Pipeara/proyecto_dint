import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';
const initialForm = {
  first_name: '',
  last_name: '',
  email: '',
  rut: '',
  rutDv: '',
  password: '',
  confirmPassword: '',
  address: '',
  birthdate: '',
  nationality: '',
  disability: false,
  disability_description: ''
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9K]{1}$/;


const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const dvRef = useRef();

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/perfil');
    }
  }, []);

  const handleUser = (event) => {
    const newUser = { ...user, [event.target.name]: event.target.value };
    setUser(newUser);
    if (event.target.name === 'rut' && event.target.value.length >= 8) {
      dvRef.current.focus();
    }
    if (event.target.name === 'password' || event.target.name === 'confirmPassword') {
      setPasswordMismatch(newUser.password !== newUser.confirmPassword);
    }
};

  const handleDisabilityChange = (event) => {
    setUser({ ...user, disability: event.target.checked });
  };

  const handleDescriptionChange = (event) => {
    if (user.disability) {
      setUser({ ...user, disability_description: event.target.value });
    }
  };

  const handleForm = async (event) => {
    event.preventDefault();

    // Validación de campos
    if (
      !user.first_name.trim() ||
      !user.last_name.trim() ||
      !user.email.trim() ||
      !user.rut.trim() ||
      !user.rutDv.trim() ||
      !user.password.trim() ||
      !user.confirmPassword.trim() ||
      !user.address.trim() ||
      !user.birthdate.trim() ||
      !user.nationality.trim()
    ) {
      return window.alert('Todos los campos son obligatorios.');
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!');
    }

    const rut = user.rut + '-' + user.rutDv;
    if (!rutRegex.test(rut)) {
      return window.alert('El formato del RUT no es correcto!');
    }

    if (user.password !== user.confirmPassword) {
      return window.alert('Las contraseñas no coinciden.');
    }

    console.log('Enviando datos al backend...');

    // Unir rut y rutDv antes de enviar al backend
    const userToSend = { ...user, rut: rut };
    delete userToSend.confirmPassword;
    try {
      const response = await axios.post(ENDPOINT.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToSend)
      });
    
      console.log(response);
    
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
    
      window.alert('Usuario registrado con éxito 😀.');
      navigate('/login');
    } catch (error) {
      console.error(error.message);
      window.alert(`${error.message} 🙁.`);
    }
  };

  return (
    <form onSubmit={handleForm} className='form-container mt-5' style={{ borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)', position: 'relative', width: '40%', height: '50%', margin: 'auto' }}>
      <img src="/src/img/dint.png" alt="Logo" style={{ position: 'absolute', top: '10px', left: '10px', height: '50px' }} />
      <h1 style={{ fontSize: '20px' }}>Registrar nuevo usuario</h1>
      <hr />
      <div className='form-group mt-3'>
        <input
          value={user.first_name}
          onChange={handleUser}
          type='text'
          name='first_name'
          className='form-control mb-3'
          placeholder='Nombre'
        />
      </div>
      <div className='form-group mt-3'>
        <input
          value={user.last_name}
          onChange={handleUser}
          type='text'
          name='last_name'
          className='form-control mb-3'
          placeholder='Apellido'
        />
      </div>
      <div className='form-group'>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control mb-3'
          placeholder='Email'
        />
      </div>
      <div className='form-group'>
        <select
          value={user.nationality}
          onChange={handleUser}
          name='nationality'
          className='form-control mb-3'
        >
          <option value=''>Selecciona Nacionalidad</option>
          <option value='Nacional'>Nacional</option>
          <option value='Extranjero'>Extranjero</option>
        </select>
      </div>
      <div className='form-group d-flex'>
        <input
          value={user.rut}
          onChange={handleUser}
          type='text'
          name='rut'
          className='form-control mb-3 mr-2'
          placeholder='RUT'
          style={{ width: '150px' }} 
        />
        <input
          ref={dvRef}
          value={user.rutDv}
          onChange={handleUser}
          type='text'
          name='rutDv'
          className='form-control mb-3'
          placeholder='DV'
          maxLength='1'
          style={{ width: '50px' }} 
        />
      </div>
      <div className='form-group'>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control mb-3'
          placeholder='Contraseña'
        />
      </div>
      <div className='form-group'>
        <input
          value={user.confirmPassword}
          onChange={handleUser}
          type='password'
          name='confirmPassword'
          className='form-control mb-3'
          placeholder='Confirmar Contraseña'
        />
      </div>
      <div className='form-group'>
        <input
          value={user.address}
          onChange={handleUser}
          type='text'
          name='address'
          className='form-control mb-3'
          placeholder='Dirección'
        />
      </div>
      <div className='form-group'>
        <input
          value={user.birthdate}
          onChange={handleUser}
          type='date'
          name='birthdate'
          className='form-control mb-3'
          placeholder='Fecha de Nacimiento'
        />
      </div>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='checkbox'
          text='Discapacidad'
          name='disability'
          checked={user.disability}
          onChange={handleDisabilityChange}
          id='disability'
        />
        <label className='form-check-label' htmlFor='disability'>
          Tiene Alguna Discapacidad
        </label>
      </div>
      {user.disability && (
        <div className='form-group'>
          <input
            value={user.disability_description}
            onChange={handleDescriptionChange}
            type='text'
            name='disability_description'
            className='form-control mb-3'
            placeholder='Descripción de la discapacidad'
          />
        </div>
      )}
      <button type='submit' className='btn btn-primary'>
        Registrar
      </button>
    </form>
  );
};

export default Register;