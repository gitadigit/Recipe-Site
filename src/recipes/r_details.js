import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../style.css'

const DetailsREcipe = () => {

    const { state } = useLocation();
    const naving = useNavigate();
    const dispatch = useDispatch()

    const buyFunction = (i) => {
        dispatch({ type: "ADD_SHOPPING", payload: i })
        naving("../s_get")
    }

    const cardStyle = {
        display: "inline-block",
        width: "30%",
        margin: "10px",
        padding: "20px",
        background: "black",
        color: "white",
        border: "1px solid white",
        borderRadius: "10px",
        textAlign: "center",
    };
    const imageStyle = {
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "10px",
    };

    return <Fragment>

        <h2>Details-Recipe</h2>
        <div style={cardStyle} key={state?.Id}>
            <h3> {state?.Name}</h3>
            <img src={state?.Img} alt={state?.Name} style={imageStyle} />
            <h4> דרגת קושי :{state?.Difficulty}</h4>
            <h4> משך זמן : {state?.Duration}</h4>
            <div>
                {state.Ingrident.map((i) => (
                    <div >
                        <h4>  {i?.Name}: {i?.Count} {i?.Type}
                            <IconButton style={{ color: "white" }} aria-label="add to shopping cart" onClick={() => buyFunction(i)}>
                                <AddShoppingCartIcon />
                            </IconButton>
                        </h4>
                    </div>
                ))}
            </div>
            <div>
                <h5 >: אופן ההכנה </h5>
                {state?.Instructions.map((i) => (
                    <p> {i}</p>
                ))}
                {console.log("instructions", state.Instructions.i)}
            </div>
        </div>
    </Fragment>
}

export default DetailsREcipe;
