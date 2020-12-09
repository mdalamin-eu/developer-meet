import axios from "axios";
import {

} from './Types';
import { setAlert } from "./alert"

export const startPostsLoading = () => dispatch => {
    dispatch()
}



export const postLike = id => async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
  
      const res = await axios.put(`/api/posts/like/${id}`, config);
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (error) {}
  };