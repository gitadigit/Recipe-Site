import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { Fragment } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material-next/Button';
import SendIcon from '@mui/icons-material/Send';
import { Input } from '@mui/base/Input';
import '../style.css'

const schema = yup.object({
  Name: yup.string().required(),
}).required();

export default function AddCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const naving = useNavigate();

  const onSubmit = (data) => {
    axios.post('http://localhost:8080/api/category', data)
      .then(res => {
        dispatch({ type: "ADD_CATEGORY", payload: res.data })
        naving('/r_get')
      })
      .catch(err => {
        console.error(err)
        alert(err.response.data)
      })
  }

  return <Fragment>

    <h2>Add-Category</h2>
    <form onSubmit={handleSubmit(onSubmit)}>

      <label>Name</label>
      <Input {...register("Name")} placeholder="enter name category" />
      <p>{errors.Name?.message}</p>

      <Button type="submit" style={{ backgroundColor: "gray" }} variant="contained" endIcon={<SendIcon />} >  Send
      </Button>
    </form>
  </Fragment>
}