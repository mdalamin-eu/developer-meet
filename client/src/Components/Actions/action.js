import {REGISTER_USER } from './Types'
export const regAction= (data) => async dispatch =>
{
    dispatch({type:REGISTER_USER, payload:data});
}