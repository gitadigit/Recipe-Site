import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import React, { Fragment } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { Input } from '@mui/base/Input';
import '../style.css'

const schema = yup.object({
  Username: yup.string().min(2).max(15).required(),
  Password: yup.string().min(4).max(15).required(),
}).required();

export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm({ // פונקציות ונתונים שימושיים מהטופס.
    resolver: yupResolver(schema) // יוצרת טופס ומחברת לו את סכימת הוולידציה.
  });

  const dispatch = useDispatch();
  const navig = useNavigate();

  const onSubmit = (data) => {
    axios.post('http://localhost:8080/api/user/login', data)
      .then(res => {
        const UserId = res.data.Id;
        dispatch({ type: "GET_USER", payload: res.data })

        axios.get("http://localhost:8080/api/recipe")
          .then(res => {
            dispatch({ type: "GET_RECIPES", payload: res.data })
          })
          .catch(err => {
            console.error(err)
            alert(err.response.data)
          })

        axios.get("http://localhost:8080/api/category")
          .then(res => {
            dispatch({ type: "GET_CATEGORY", payload: res.data })
          })
          .catch(err => {
            console.error(err)
            alert(err.response.data)
          })

        navig("/homePage")

        axios.get(`http://localhost:8080/api/bay/${UserId}`)
          .then(res => {
            dispatch({ type: "GET_SHOPPING", payload: res.data })
          })
          .catch(err => {
            console.error(err)
            alert(err.response.data)
          })

      })
      .catch(err => {
        console.error(err)
        alert(err.response.data)
        navig("/signin")
      }
      )
  }

  return <Fragment>

    <h2>Login</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Username</label>
      <Input {...register("Username")} />
      <p>{errors.Username?.message}</p>

      <label>Password</label>
      <Input type={"password"} {...register("Password")} />
      <p>{errors.Password?.message}</p>

      {/* // placeholder="Enter your password" /> */}
      <Button type="submit" style={{ backgroundColor: "red" }} variant="contained" endIcon={<SendIcon />} >  Send
      </Button>
    </form>

  </Fragment >
};

