import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material-next/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import '../style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";

const GetShopping = () => {
  const shopping = useSelector((state) => state?.shoppingCart);
  const dispatch = useDispatch();
  const navig = useNavigate();

  const nav_delete = (s) => {
    axios
      .post(`http://localhost:8080/api/bay/delete/${s.Id}`)
      .then((res) => {
        dispatch({ type: "DELETE_SHOPPING", payload: s.Id });
        navig('/s_get');
      })
      .catch((err) => {
        console.error(err);
        // alert(err.response.data)
      });
  };
  const nav_edit = (s) => {
    navig("/s_add", { state: s });
  };

  const nav_add = (s) => {
    navig("/s_add", { state: s });
  };

  const tableStyle = {
    background: "black",
    color: "white",
    padding: "40px",
    margin: "auto",
  };

  return (
    <Fragment>
      <h2>Shopping</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shopping.map((s) => (
            <tr key={s.Id}>
              <td>{s.Name}</td>
              <td>{s.Count}</td>
              <td>
                <IconButton aria-label="delete" size="large"  onClick={() => nav_delete(s)}>
                  <DeleteIcon style={{color:"white"}}fontSize="inherit" />
                </IconButton>
                {/* <button onClick={() => nav_delete(s)}>Delete</button> */}
                {/* <button onClick={() => nav_edit(s)}>Edit</button> */}
                <Button onClick={() => nav_edit(s)} variant="outline-warning">  <FontAwesomeIcon icon={faMoneyCheck} /> </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={() => nav_add()} style={{ backgroundColor: "red",borderRadius: '8px',  }} variant="contained" >  AddProdect
      </Button>
    </Fragment>
  );
};

export default GetShopping;