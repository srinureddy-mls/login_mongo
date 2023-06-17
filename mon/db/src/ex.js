import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsPencilSquare, BsFillArrowLeftCircleFill, BsEye } from "react-icons/bs";
import ReactPaginate from 'react-paginate';

function Data() {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState([]);
  const [onDelete, setOnDelete] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/productts/products')
      .then(res => {
        
        if (res.data.status === 'success') {
          setData(res.data.data);
          setFilteredData(res.data.data);
        } else {
          setAuth(false);
        }
      })
      .catch(err => console.log(err));
    setOnDelete(0);
  }, [onDelete]);

  useEffect(() => {
    const filtered = data.filter(item =>
      item &&
      item.id &&
      item.Product_Name &&
      item.Product_cost &&
      item.Person_age &&
      item.Order_date &&
      item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Product_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Product_cost.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Person_age.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Order_date.toLowerCase().includes(searchTerm.toLowerCase())
    );
   
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the content?")) {
      axios.delete(`http://localhost:3001/productts/deleteProduct/${id}`)
        .then(res => {
          setOnDelete(1);
        })
        .catch(err => console.log(err));
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(filteredData.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mt-3">
      <div>
        <div className="d-flex justify-content-md-between">
          <h3>Products Data</h3>
          <Link to="/upload" className="btn btn-success">Create +</Link>
        </div>
        <div className="d-flex justify-content-md-between">
          <Link to="/Home" className="btn btn-lg "><BiArrowBack /></Link>
          <div className="mt-3">
            <input
              type="text"
              className="form-control form-control-sm"
              style={{ width: "200px" }}
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>id</th>
              <th>Product_Name</th>
              <th>Product_cost</th>
              <th>Person_age</th>
              <th>Order_date</th>
              <th>Product_image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((user, index) => {
              const serialNumber = firstIndex + index + 1;
              return (
                <tr key={user._id}>
                  <td>{serialNumber}</td>
                  <td>{user._id}</td>
                  <td>{user.Product_Name}</td>
                  <td>{user.Product_cost}</td>
                  <td>{user.Person_age}</td>
                  <td>{user.Order_date}</td>
                  
                  <td>
                    <img src={`/Product_images/${user.Product_image}`} alt="error" width={100} height={100} />
                  </td>
                  <td>
                    <Link to={`/edit/${user._id}`} className="btn btn-md">
                      <BsPencilSquare />
                    </Link>
                    <Link to={`/view/${user._id}`} className="btn  btn-md"><BsEye /></Link>
                    <button onClick={() => handleDelete(user._id)} className='btn btn-md'><AiOutlineDelete /></button>
                  </td>
                </tr>
              );
              
            })}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>Prev</a>
            </li>
            {numbers.map((n, i) => (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                <a href="#" className="page-link" onClick={() => changeCPage(n)}>{n}</a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Data;
