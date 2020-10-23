import {REGISTER_USER } from './Types'
export const registerAction= (data) => async dispatch =>
{
    dispatch({type:REGISTER_USER, payload:data});
}