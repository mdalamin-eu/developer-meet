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


//clearte Profile

export const createProfile = (profileData, history, isEdit= false) => async dispatch =>{
   try{
       const config = {
           headers: { "Content-Type":"application/json"}
       };
       dispatch(profileLoadingStart());
       const res = await axios.post("api/profile", profileData, config);
       dispatch({
           type: GET_PROFILE,
           payload: res.data
       });
       dispatch( setAlert (isEdit? "Profile Update" : "Profile Created", "success") );
       if(!isEdit){
           return history.push("/dashboard");
       }
   }catch (err) {
       const errors = err.response.data.errors;
       if(errors){
           errors.forEach(error => dispatch(setAlert(error.msg, "denger")));
       }
       dispatch({ type: PROFILE_ERROR,
    payload:{msg:err.response.statusText, status:err.response.status}
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