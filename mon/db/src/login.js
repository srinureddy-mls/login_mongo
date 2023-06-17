import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import validations from './loginvalidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validations(values)); // Validate the form inputs

    // Check if there are any validation errors
    if (Object.keys(errors).length === 0) {
      // Make the login request to the backend API
      axios
        .post('http://localhost:3001/login', values)
        .then((res) => {
          if (res.data.Login === true) {
            navigate('/Home');
          } else {
            alert('No record exists');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-50'>
        <h2>Sigin_In</h2>
        <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name ='email' autoComplete='off' 
                        onChange={e=>setValues({...values,email:e.target.value})} className='form-control rounded-0'/>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type="Password" placeholder='Enter Password' name ='password'  
                        onChange={e=>setValues({...values,password:e.target.value})}
                        className='form-control rounded-0'/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div>
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                        <p>You are agree to aour terms and policies</p>
                        <Link to ="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;