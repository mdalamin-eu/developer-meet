import axios from "axios";
import {REGISTER_SUCCESS,  REGISTER_FAIL,
                LOGIN_FAIL, LOGIN_SUCCESS , USER_LOADED, AUTH_ERROR} from './Types'
import { setAlert } from "./alert";
import setAuthToken from "../utlis/setAuthToken"


//LoadUser
export const LoadUser = () => async dispatch => {
    if(localStorage.jwtToken){
        setAuthToken(localStorage.jwtToken);
    }
    try {
        const res = await axios.get("api/users/current");
        dispatch({
            type:USER_LOADED,
            payload: res.data
        });
    }catch(error){
        dispatch({
            type:AUTH_ERROR
        });
    }
};



//RegisterUser
export const registerUser = userData => async dispatch =>{
const config ={
headers:{
    "Content-Type":"application/json"
}
};
try{
const res = await axios.post('api/users/register', userData, config);
dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data
});
}catch(error){
    const errors = error.response.data.errors;
    if(errors){
        errors.forEach(error=>dispatch(setAlert(error.msg, "danger")))
    }
    dispatch({
        type:REGISTER_FAIL
    });
}
};

//login
export const loginUser = (userData, history) => async dispatch => {
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    };

    try{
        const res = await axios.post("api/users/login", userData, config );
        dispatch({
            type : LOGIN_SUCCESS,
            payload:res.data
        });

        dispatch(LoadUser())
        history.push("/dashboard");

    }catch (err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type:LOGIN_FAIL
        });
    }
};
// Set logged in user
export const setCurrentUser = () => async dispatch => {
    dispatch(LoadUser())
  };
  