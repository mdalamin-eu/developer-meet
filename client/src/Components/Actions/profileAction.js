import axios from "axios";
import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR,
                PROFILE_LOADING_START, UPDATE_PROFILE,
                ACCOUNT_DELETE, CLEAR_ACCOUNT } from './Types'
import {setAlert } from "./alert";
//currentUserProfile, deleteAccount

export const profileLoadingStart = () => async dispatch=>{
    dispatch({
        type: PROFILE_LOADING_START
    })
}

export const currentUserProfile = () => async dispatch=>{
    try{
        dispatch(profileLoadingStart());
        const res = await axios.get("api/users/myprofile");
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch(error) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{}
        });
    }
};


//delete experience by id

// export const deleteExperience = id => async dispatch => {
//     try{
//         const config={
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         };
//         const res = await axios.delete(`api/users/experience/${id}`, config);
//         dispatch({ type:GET_PROFILE,
//         payload: res.data
//     });
//     dispatch (setAlert("Successfully deleted experince"))
//     } catch(err){

//     }
// } 

// export const addEducation = (data, history)=> async dispatch =>{

// }