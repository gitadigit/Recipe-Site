import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Fragment } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Input } from '@mui/base/Input';
import Button from '@mui/material-next/Button';
import SendIcon from '@mui/icons-material/Send';
import '../style.css'


const schema = yup.object({
  Name: yup.string().required(),
  CategoryId: yup.string().required(),
  Img: yup.string().required(),
  Duration: yup.string().required(),
  Difficulty: yup.number().positive().integer().required(),
  Description: yup.string().required(),
  Ingrident: yup.array().of(
    yup.object().shape({
      Name: yup.string().required(),
      Count: yup.number().required(),
      Type: yup.string().nullable(),
    })),
  InstructionsArray: yup.array().of(
    yup.object().shape({
      Instruction: yup.string().required(),
    }),
  )

})
  .required();

export default function AddRecipes() {

  const { state } = useLocation();
  const userId = useSelector(state => state?.user?.Id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });
  const { fields: fieldsIngrident, append: appendIngrident, remove: removeIngrident } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Ingrident", // unique name for your Field Array
  });
  const { fields: fieldsInstuctions, append: appendInstructions, remove: removeInstructions } = useFieldArray({
    control,
    name: "InstructionsArray",
  });

  const onSubmit = (data) => {
    console.log("submit")
    if (state) {
      const recipe = {
        Id: state.Id,
        Name: data.Name,
        UserId: userId,
        CategoryId: data.CategoryId,
        Img: data.Img,
        Duration: data.Duration,
        Difficulty: data.Difficulty,
        Description: data.Description,
        Ingrident: data.Ingrident,
        Instructions: data.InstructionsArray
      }
      axios.post("http://localhost:8080/api/recipe/edit", recipe)
        .then(res => {
          dispatch({ type: "EDIT_RECIPES", payload: res.data })
          navigate("/r_get")
        })
        .catch(err => {
          console.error(err);
          alert(err.response.data)
        })
    }
    else {
      const recipie = {
        Name: data.Name,
        UserId: userId,
        CategoryId: data.CategoryId,
        Img: data.Img,
        Duration: data.Duration,
        Difficulty: data.Difficulty,
        Description: data.Description,
        Ingrident: data.Ingrident,
        Instructions: data.InstructionsArray
      }
      axios.post('http://localhost:8080/api/recipe', recipie)
        .then(res => {
          dispatch({ type: "ADD_RECIPES", payload: res.data })
          navigate("/r_get")
        })
        .catch(err => {
          console.error(err)
          alert(err.response.data)
        })
    }
  }

  return (
    <Fragment>
      <h2>AddRecipes</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Enter recipes name</label>
        <Input {...register("Name")} slot="text" defaultValue={state ? state.Name : null} />
        <p>{errors.Name?.message}</p>

        <label>Enter recipes categoryId</label>
        <Input {...register("CategoryId")} defaultValue={state ? state.CategoryId : null} />
        <p>{errors.CategoryId?.message}</p>

        <label>Enter recipes Img</label>
        <Input {...register("Img")} defaultValue={state ? state.Img : null} />
        <p>{errors.Img?.message}</p>

        <label>Enter recipes duration</label>
        <Input {...register("Duration")} defaultValue={state ? state?.Duration : null} />
        <p>{errors.Duration?.message}</p>

        <label>Enter recipes Difficulty</label>
        <Input {...register("Difficulty")} defaultValue={state ? state?.Difficulty : null} />
        <p>{errors.Difficulty?.message}</p>

        <label>Enter recipes Description</label>
        <Input {...register("Description")} defaultValue={state ? state?.Description : null} />
        <p>{errors.Description?.message}</p>

        {fieldsIngrident.map((field, index) => (
          <>
            <hr />
            <label>Prodect</label>
            <label>Name</label>
            <Input {...register(`Ingrident.${index}.Name`)} defaultValue={state ? state?.Duration : "Name"} />
            <p>{errors.Ingrident?.[index]?.count?.message}</p>

            <label>Count</label>
            <Input {...register(`Ingrident.${index}.Count`)} defaultValue={state ? state?.Duration : "Count"} />
            <p>{errors.Ingrident?.[index]?.Count?.message}</p>

            <label>Type</label>
            <Input {...register(`Ingrident.${index}.Type`)} defaultValue={state ? state?.Duration : "Type"} />
            <p>{errors.Ingrident?.[index]?.Type?.message}</p>

            <button onClick={() => removeIngrident(index)}> DeleteProduct</button>
          </>
        ))}
        <button onClick={() => appendIngrident({})}> AddProduct</button>
        <hr />
        {fieldsInstuctions.map((field, index) => (
          <>
            <label>Instructions</label>
            <Input {...register(`InstructionsArray.${index}.Instruction`)} defaultValue={state ? state?.Duration : "Instructions"} />
            <p>{errors.InstructionsArray?.[index]?.InstructionsArray?.message}</p>

            <button onClick={() => removeInstructions(index)}> RemovevInstructions</button>
          </>
        ))}
        <button onClick={() => appendInstructions({})}> AddInstructions</button>
        <hr />
        <Button type="submit" style={{ backgroundColor: "red", borderRadius: '8px', }} variant="contained" endIcon={<SendIcon />} >  Send
        </Button>

      </form>
    </Fragment>
  );

}