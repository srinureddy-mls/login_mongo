import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

function Register() {
  const [values, setValues] = useState({
    Product_Name: '',
    Product_cost: '',
    Person_age: '',
    Order_date: '',
    Product_image: '',
  });

  const handlechange = (event) => {
    if (event.target.name === 'Product_image') {
      setValues({ ...values, [event.target.name]: event.target.files[0] });
    } else if (event.target.name === 'Order_date') {
      setValues({ ...values, Order_date: event.target.value });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/ex');
    const formdata = new FormData();
    formdata.append('Product_image', values.Product_image);
    formdata.append('Product_Name', values.Product_Name);
    formdata.append('Product_cost', values.Product_cost);
    formdata.append('Person_age', values.Person_age);
    formdata.append('Order_date', values.Order_date);

    axios.post('http://localhost:3001/productts/createproducts', formdata)
    .then((res) => {
      if (res.data.status === 'success') {
        console.log('success');
      } else {
        alert('Product image is required.');
      }
    })
    .catch((err) => {
      console.log(err);
      // Handle the error appropriately (e.g., display an error message)
    });
  
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-50'>
        <div className='d-flex justify-content-sm-between'>
          <h2>Order Form</h2>
          <Link to='/ex' className='btn btn-lg'>
            <BiArrowBack />
          </Link>
        </div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='mb-3'>
            <label htmlFor='Product_Name'>
              <strong>Product Name</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Product Name'
              name='Product_Name'
              onChange={handlechange}
              className='form-control rounded-0'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Product_cost'>
              <strong>Product Cost</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Product Cost'
              name='Product_cost'
              onChange={handlechange}
              className='form-control rounded-0'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Person_age'>
              <strong>Person Age</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Person Age'
              name='Person_age'
              onChange={handlechange}
              className='form-control rounded-0'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Order_date'>
              <strong>Order Date</strong>
            </label>
            <input
              type='date'
              placeholder='Enter Order Date'
              name='Order_date'
              onChange={handlechange}
              className='form-control rounded-0'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Product_image'>
              <strong>Product Image</strong>
            </label>
            <input
              type='file'
              name='Product_image'
              onChange={handlechange}
              className='form-control rounded-0'
            />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
