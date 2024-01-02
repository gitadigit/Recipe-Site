import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { Fragment } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import '../style.css';
import { Input } from '@mui/base/Input';
import Button from '@mui/material-next/Button';
import SendIcon from '@mui/icons-material/Send';

const schema = yup.object({
  Username: yup.string().min(2).max(15).required(),
  Password: yup.string().min(4).max(15).required(),
  Name: yup.string().min(2).required(),
  Phone: yup.string().min(9).max(10).required(),
  Email: yup.string().email({ domain: ["example.com"], }).required(),
  Tz: yup.string().min(9).max(9).required()
}).required();

export default function Signin() {

  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(schema) 
  });

  const dispatch = useDispatch();
  const navig = useNavigate();

  const onSubmit = (data) => {
    axios.post('http://localhost:8080/api/user/sighin', data)
      .then(res => {
        dispatch({ type: "GET_USER", payload: res.data })
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

    <h3>Signin</h3>
    <form onSubmit={handleSubmit(onSubmit)}>

      <Input {...register("Username")} placeholder="Enter your username " />
      <p>{errors.Username?.message}</p>

      <Input type={"password"}{...register("Password")} placeholder="Enter your password" />
      <p>{errors.Password?.message}</p>

      <Input {...register("Name")} placeholder="Enter your name" />
      <p>{errors.Name?.message}</p>

      <Input {...register("Phone")} placeholder="Enter your phone" />
      <p>{errors.Phone?.message}</p>

      <Input {...register("Email")} placeholder="Enter your email" />
      <p>{errors.Email?.message}</p>

      <Input {...register("Tz")} placeholder="Enter your tz" />
      <p>{errors.Tz?.message}</p>

      <Button type="submit" style={{ backgroundColor: "red" }} variant="contained" endIcon={<SendIcon />} >  Send
      </Button>
    </form>

  </Fragment>
};