import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function View() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/view/${id}`)
      .then((res) => {
        console.log(res)
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { Product_Name, Product_cost, Person_age, Order_date, Product_image } = product;

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-30 bg-white rounded p-3'>
        <h2>Product Detail</h2>
        <div>
          <strong>Product Name:</strong>
          <span>{Product_Name}</span>
          <br />
          <strong>Product Cost:</strong>
          <span>{Product_cost}</span>
          <br />
          <strong>Person Age:</strong>
          <span>{Person_age}</span>
          <br />
          <strong>Order Date:</strong>
          <span>{Order_date}</span>
          <br />
          <strong>Product Image:</strong>
          <span>
            <img src={`/Product_images/${Product_image}`} alt='error' width={100} height={100} />
          </span>
          <br />
          <Link to="/ex" className="btn btn-primary">Back</Link>
        </div>
      </div>
    </div>
  );
}

export default View;
