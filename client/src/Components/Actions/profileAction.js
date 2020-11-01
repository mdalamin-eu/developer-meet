import axios from "axios";
import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR,
                PROFILE_LOADING_START, UPDATE_PROFILE,
                ACCOUNT_DELETE, CLEAR_ACCOUNT } from './Types'
import {setAlert } from "./alert";
//currentUserProfile, deleteAccount


export const currentUserProfile = () => async dispatch=>{
    try{
        dispatch(profileLoadingStart());
        const res = await axios.get ("api/users/myprofile");
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