import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { Fragment } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Input } from '@mui/base/Input';
import Button from '@mui/material-next/Button';
import SendIcon from '@mui/icons-material/Send';
import '../style.css'

const schema = yup.object({
  Name: yup.string().required(),
  Count: yup.number().positive().integer().required(),
}).required();

export default function AddShopping() {

  const userId = useSelector(state => state?.user?.Id);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navig = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    const myData = {
      UserId: userId,
      Name: data.Name,
      Count: data.Count
    }

    if (state) {
      axios.post('http://localhost:8080/api/bay/edit', myData)
        .then(res => {
          dispatch({ type: "ADD_SHOPPING", payload: res.data })
          navig("/s_get")
        })
        .catch(err => {
          console.log(err)
          // alert(err.response.data)
        })
    }
    else {
      axios.post('http://localhost:8080/api/bay', myData)
        .then(res => {
          dispatch({ type: "ADD_SHOPPING", payload: res.data })
          navig("/s_get")
        })
        .catch(err => {
          console.log(err)
          // alert(err.response.data)
        })
    }
  }

  return (<Fragment>
    <h2>AddShopping</h2>
<br></br>
<br></br>

    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <Input {...register("Name")} defaultValue={state ? state.Name : null} />
      <p>{errors.Name?.message}</p>

      <label>Count</label>
      <Input {...register("Count")} defaultValue={state ? state.Count : null} />
      <p>{errors.Count?.message}</p>
        <Button type="submit" style={{ backgroundColor: "red" ,borderRadius: '8px', }} variant="contained" endIcon={<SendIcon />} >  Send
        </Button>

    </form>

  </Fragment>)
}