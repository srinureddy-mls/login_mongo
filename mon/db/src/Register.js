import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validations from './signinvalidation';

function Sigin_Up() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handlechange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form values:', values); // Check the values object

    axios
      .post('http://localhost:3001/register', values)
      .then((res) => {
        console.log('Response:', res); // Check the response from the server
        if (res.data.Status === 'Success') {
          navigate('/');
        } else {
          alert('Email is already existed');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-50'>
        <h2>Sign-up</h2>
        <form onSubmit={handleSubmit}>
            <div  className='mb-3'>
                <label htmlFor='name'><strong>name</strong></label>
                <input id='name' type='text' placeholder='Enter Name'  name='name'
                 onChange={handlechange} className='form-control rounded-0'/>
                 {errors.name && <span className='text-danger'>{errors.name}</span>}
            </div>
            <div  className='mb-3'>
                <label htmlFor='email'><strong>email</strong></label>
                <input id='email' type='text' placeholder='Enter Email'  name='email'
                onChange={handlechange} className='form-control rounded-0'/>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div  className='mb-3'>
                <label htmlFor='password'><strong>password</strong></label>
                <input id='password' type='text' placeholder='Enter Password'  name='password'
                 onChange={handlechange} className='form-control rounded-0'/>
                 {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                <p>You are agree to aour terms and policies</p>
                <Link to ="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Sigin_Up
