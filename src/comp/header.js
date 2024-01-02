import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import '../style.css'
import Button from '@mui/material-next/Button';
import backgroundImage from "../image/headerimg.png";
import { useState } from "react";

const Header = () => {

        const isUser = useSelector((state) => state?.user)
        const [isClick,setIsClick] =useState(false) 
        const naving = useNavigate();
        const dispatch = useDispatch()

        const funcExit = () => {
                dispatch({ type: "GET_USER", payload: null })
                naving("/");
                alert("Goodbye")
        }

        const buttonStyle = {
                backgroundColor: "red",
                color:"white",
                variant: "outlined",
                size: "large",
            };

        return <>
                {!isUser && <Paper
                        sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                        }}
                >
                        <div
                                style={{
                                        display: "flex",
                                        justifyContent: "top",
                                        alignItems: "center",
                                        gap: "1rem",
                                }}
                        ></div>

                        {!isClick && <Button style={buttonStyle} onClick={() => {naving("/signin");setIsClick(true)}}>Signin</Button >}
                        {!isClick && <Button style={buttonStyle} onClick={() => {naving("/login");;setIsClick(true)}}>Login</Button >}
                </Paper>}

                {isUser && <Button style={buttonStyle} onClick={() => naving("/homePage")}>HomePage</Button >}
                {isUser && <Button style={buttonStyle} onClick={funcExit}>Exit</Button >}

                {isUser && <Button style={buttonStyle} onClick={() => naving("/r_my")}>MyRecipe</Button >}
                {isUser && <Button style={buttonStyle} onClick={() => naving("/r_get")}>Recipe</Button >}
                {isUser && <Button style={buttonStyle} onClick={() => naving("/r_add")}>AddRecipe</Button >}


                {isUser && <Button style={buttonStyle} onClick={() => naving("/c_add")}>AddCategory</Button >}
                {isUser && <Button style={buttonStyle} onClick={() => naving("/s_get")}>Shopping</Button >}
                {isUser && <Button style={buttonStyle} onClick={() => naving("/s_add")}>AddShopping</Button >}

        </>
}
export default Header;