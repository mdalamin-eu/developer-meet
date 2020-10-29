import axios from "axios";
import {REGISTER_SUCCESS,  REGISTER_FAIL,
                LOGIN_FAIL, LOGIN_SUCCESS } from './Types'
import { setAlert } from "./alert";


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