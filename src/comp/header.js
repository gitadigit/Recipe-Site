import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import Button from '@mui/material-next/Button';
import backgroundImage from "../image/headimg4.jpg";
import { useState } from "react";


const Header = () => {

        const isUser = useSelector((state) => state?.user)
        const [isClick, setIsClick] = useState(false)
        // const [isAlert, setIsAlert] = useState(false)
        const location = useLocation();
        const isHeaderPath = location.pathname === '/';
        const naving = useNavigate();
        const dispatch = useDispatch()

        const funcExit = () => {

                dispatch({ type: "GET_USER", payload: null });
                alert("GoodBye 🖐");
                naving("/");
        }

        const buttonStyleUser = {
                backgroundColor: "rgb(79, 76, 76)",
                color: "white",
                variant: "outlined",
                size: "large",
                borderRadius: "8px",
                padding: "1rem 5rem",
                gap: "2rem",
                height: "7vh"

        };
        const buttonStyle = {
                backgroundColor: "rgb(79, 76, 76)",
                color: "white",
                variant: "outlined",
                size: "large",
        };

        
        return <>
        {!isClick && <h1 style={{ color: "white" }}>Recipe</h1>}

                {!isUser && isHeaderPath && <Paper
                        sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                                width: "100vw",
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                gap: "2rem"
                                
                        }}
                        >

                        <div
                                style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "8rem",

                                }}
                        ></div>
                        {!isClick && <Button style={buttonStyleUser} onClick={() => { naving("/signin"); setIsClick(true) }}>Signin</Button >}
                        {!isClick && <Button style={buttonStyleUser} onClick={() => { naving("/login");; setIsClick(true) }}>Login</Button >}
                </Paper>}
                {isUser && <Paper
                        sx={{
                                backgroundColor: "rgb(79, 76, 76)", padding: "1rem",
                        }}>
                        {<Button style={buttonStyle} isHeaderPath='' onClick={funcExit}  >Exit</Button >}
                        {<Button style={buttonStyle} onClick={() => naving("/homePage")}>HomePage</Button >}

                        {<Button style={buttonStyle} onClick={() => naving("/r_my")}>MyRecipe</Button >}
                        {<Button style={buttonStyle} onClick={() => naving("/r_get")}>Recipe</Button >}
                        {<Button style={buttonStyle} onClick={() => naving("/r_add")}>AddRecipe</Button >}


                        {<Button style={buttonStyle} onClick={() => naving("/c_add")}>AddCategory</Button >}
                        {<Button style={buttonStyle} onClick={() => naving("/s_get")}>Shopping</Button >}
                        {<Button style={buttonStyle} onClick={() => naving("/s_add")}>AddShopping</Button >}
                </Paper>}
                {/* {isAlert &&  <Alert severity="info" */}
                {/*</>sx={{
                                // display: "flex",
                                // justifyContent: "center",
                                // alignItems: "center",
                                // height: "100vh",
                                // width: "100vw",
                                // backgroundImage: `url(${backgroundImage})`,
                                // backgroundSize: "cover",
                                // backgroundPosition: "center",
                                // gap: "2rem"
                     // }}> </Alert>}*/}
        </>
}
export default Header;