import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
function Edit() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [age, setAge] = useState('');
  const [date, setData] = useState('');
  const [image, setImage] = useState(''); // Updated: Initialize image state with null
  useEffect(() => {
    axios.get(`http://localhost:3001/edit/${id}`)
      .then(res => {
        setName(res.data[0].Product_Name);
        setCost(res.data[0].Product_cost);
        setAge(res.data[0].Person_age);
        setData(res.data[0].Order_date);
        setImage(res.data[0].Product_image);
      })
      .catch(err => console.log(err));
  }, [id]); // Updated: Include 'id' as a dependency for the effect
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object
    formData.append('Product_Name', name);
    formData.append('Product_cost', cost);
    formData.append('Person_age', age);
    formData.append('Order_date', date);
    if (image) {
      formData.append('Product_image', image); // Append the image file to the FormData object
    }
    else{
      alert('Image is mandetory')
    }
    axios.put(`http://localhost:3001/update/${id}`, formData)
      .then(res => {
        console.log(res);
        if (res.data.updated) {
          navigate('/ex');
        } else {
          alert('Not updated');
        }
      });
  }
  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Capture the selected file from the input event
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-50'>
        <div className="d-flex justify-content-sm-between">
          <h2>Edit_form</h2>
          <Link to="/ex" className="btn btn-lg"><BiArrowBack /></Link>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div  className='mb-3'>
                <label htmlFor=''>Product_Name</label>
                <input type='text' placeholder='Enter Product_Name'  name='Product_Name'
                value={name} className='form-control rounded-0' onChange={e => setName(e.target.value)} />
            </div>
            <div  className='mb-3'>
                <label htmlFor=''>Product_cost</label>
                <input type='text' placeholder='Enter Product_cost'  name='Product_cost'
                 value={cost} onChange={e => setCost(e.target.value)} className='form-control rounded-0'/>   
            </div>
            <div  className='mb-3'>
                <label htmlFor=''>Person_age</label>
                <input type='text' placeholder='Enter Person_age'  name='Person_age'
                 value={age} onChange={e => setAge(e.target.value)} className='form-control rounded-0'/>   
            </div>
            <div  className='mb-3'>
                <label htmlFor=''>Order_Date</label>
                <input type='date' placeholder='Enter Order_Date'  name='Order_Date'
                 value={date} onChange={e => setData(e.target.value)} className='form-control rounded-0'/>  
            </div>
             <div className='mb-3'>
            <label htmlFor=''>Product_image</label>
            <input type='file' name='Product_image' className='form-control rounded-0' onChange={handleFileChange} />
          </div>
            <button  type='submit' className='btn btn-success w-100 rounded-0'>submit</button>   
        </form>
      </div>
    </div>
  )
}
export default Edit