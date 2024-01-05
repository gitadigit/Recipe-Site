import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material-next/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../style.css'
import { Fragment } from 'react';

const MyRecipe = () => {
    const myRecipes = useSelector(state => state?.recipes);
    const dispatch = useDispatch();
    const navig = useNavigate();
    const myId = useSelector(state => state?.user?.Id)

    const on_Delete = (m) => {
        axios.post(`http://localhost:8080/api/recipe/delete/${m}`)
            .then(res => {
                dispatch({ type: "DELETE_RECIPES", payload: m })
                navig("/r_get")
            })
            .catch(err => {
                console.error(err);
            alert(err.response.data)

            })
    }

    const nav_edit = (m) => {
        navig("/r_add", { state: m })
    }

    const nav_add = (m) => {
        dispatch({ type: "ADD_SHOPPING", payload: m })
        navig("../s_get")
    }

    const cardStyle = {
        display: "block",
        width: "20%",
        margin: "10px auto", // Added "auto" to center horizontally
        padding: "30px",
        background: "black",
        color: "white",
        border: "1px solid white",
        borderRadius: "10px",
        textAlign: "center", // Added to center content verti
    };

    const imageStyle = {
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "10px",
    };

    return (
        <Fragment>
            <h2>MyRecipe</h2>
            {myRecipes?.map(m => (
                m.UserId === myId ? (
                    <div style={cardStyle} key={m.Id}>
                        <h3>{m.Name}</h3>
                        <img src={m.Img} alt={m.Name} style={imageStyle} />
                        <p> דרגת קושי :{m.Difficulty}</p>
                        <p> משך זמן : {m.Duration} דקות</p>
                        <div>
                            {m.Ingrident.map((i) => (
                                <div key="">
                                    <p>  {i?.Name}: {i?.Count} {i?.Type}
                                        <IconButton style={{ color: "white" }} aria-label="add to shopping cart" onClick={() => nav_add(i)}>
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h5 >: אופן ההכנה </h5>
                            {m.Instructions.map((i) => (
                                <p> {i}</p>
                            ))}
                        </div>
                        <IconButton aria-label="delete" size="large" style={{ color: "white" }} onClick={() => on_Delete(m.Id)}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <Button onClick={() => nav_edit(m)} variant="outline-warning">  <FontAwesomeIcon icon={faMoneyCheck} /> </Button>
                    </div>) : " "))}
        </Fragment>
    )
};

export default MyRecipe;

