import axios from "axios";
import {
    GET_POSTS,
    POSTS_ERROR,
    POSTS_LOADING_START,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    GET_POST,
    DELETE_COMMENT
} from './Types';
import { setAlert } from "./alert"

export const startPostsLoading = () => dispatch => {
    dispatch({
        type: POSTS_LOADING_START
    });
};

export const getposts = () => async dispatch => {
    try {
        const config= {
            headers: {
                "Content-type": "application/json"
            }
        };
        dispatch(startPostsLoading());
        const res=await axios.get("api/posts", config)

    } catch (err) {
        const errors = err.response.data.errors;

        
    }
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