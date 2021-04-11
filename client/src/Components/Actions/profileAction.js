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
    console.log('what data going',profileData)
       const config = {
           headers: { "Content-Type":"application/json"}
       };
       dispatch(profileLoadingStart());
       const res = await axios.post("api/users/profile", profileData, config);
       dispatch({
           type: GET_PROFILE,
           payload: res.data
       });
       dispatch( 
           setAlert (isEdit ? "Profile Update" : "Profile Created", "success") );
       if(!isEdit){
           return history.push("/dashboard");
       }
   } catch (err) {
    //    const errors = err.response.data.errors;
    console.log("amm", err)
       if(err){
           err.forEach(error => dispatch(setAlert(error.msg, "denger")));
       }
       dispatch({ type: PROFILE_ERROR,
    payload:{msg:err.response.statusText, status:err.response.status}
});
   }
};

//add Experience
export const addExperience = (data, history) => async dispatch => {
try{
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    console.log("aaa",data)
    const res = await axios.patch("api/users/experience", data, config);
    dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
    });
    dispatch(setAlert("Update Profile", "success"));
    history.push("/dashboard");
} catch(err){
    const errors = err.response.data.errors;

    if( errors ){
        errors.forEach(error =>dispatch(setAlert(errors.msg, "danger")));
    }
    dispatch({
        type: PROFILE_ERROR,
        payload:{msg:err.response.statusText, status:err.response.status}
    });
}
};


//add education
export const addEducation = (data, history) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        };
        const res = await axios.put("api/users/education", data, config);

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Update profile by education", "success"));
        history.push("/dashboard");

    } catch (err) {
        const errors = err.response.data.errors;
    
    if (errors) {
        errors.forEach(error=> dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText,status:err.response.status}
    })
}
}
//delete experience by id

export const deleteExperience = id => async dispatch => {
    try{
        const config={
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.delete(`api/users/experience/${id}`, config);
        
        dispatch({ type:GET_PROFILE,
        payload: res.data
    });
    dispatch (setAlert("Successfully deleted experince"))
    } catch(err){
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        });
    }

} ;

export const deleteEducation = id => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.delete(`/api/profile/education/${id}`, config)
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        });
        dispatch (setAlert("Successfully Deleted education","success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Profile handler //////////////////////////////////////////////
//////////////////////////////////////////
 export const getProfilebyhandler = handle => async dispatch => {
     try {
         const config = {
             headers: {
                 "Content-Type":"application/json"
             }
         };
         dispatch(profileLoadingStart());
         const res= await axios.get(`api/users/handle${handle}`,config);
         console.log("data of profile", res)
         dispatch({
             type: GET_PROFILE,
             payload:res.data
         });
     }catch(err){
        const errors= err.response.data.errors; 

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
     }
 }

//Get Profiles

export const getProfiles = () => async dispatch=> {
    try{
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        };
        dispatch(profileLoadingStart());
        const res =await axios.get('api/users/profiles', config);

        dispatch({
            type:GET_PROFILES,
            payload:res.data
        });
    }catch (err){
        const errors=err.response.data.errors;

        if(err) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        });
    }
};

export const deleteAccount = ( )=> async dispatch =>{
if (window.confirm("Are you sure? this can not undone")){
    try{
        const config ={
            headers:{
                "Content-Type":"application/json"
            }
        };
        const res = await axios.delete("api/profile", config);
        dispatch({
            type:CLEAR_ACCOUNT
        });
        dispatch({
            type: ACCOUNT_DELETE
        });
        dispatch(setAlert("Account deleted successfully", "success"));
    } catch(err){
        const errors= err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
};

