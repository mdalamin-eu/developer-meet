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

//get Post
export const getposts = () => async dispatch => {
    try {
        const config= {
            headers: {
                "Content-type": "application/json"
            }
        };
        dispatch(startPostsLoading());
        const res=await axios.get("api/posts", config)
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;

        if( errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")));
        }
        dispatch({
            type: POSTS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


//Post Like
export const postLike = id => async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
  
      const res = await axios.put(`api/posts/like/${id}`, config);
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (error) {}
  };

  //Delete Post

  export const  deletePost = id = async dispatch=> {
try{
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    };
    const res = axios.delete(`api/posts/${id}`, config);
    dispatch({
        type:DELETE_POST,
        payload: id
    })
    dispatch(setAlert("Your post successfully deleted", "success"));
} catch (err) {
const errors = err.response.data.errors;
if(errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
}
dispatch({
    type: POSTS_ERROR,
    payload: {msg:err.response.statusText, status: err.response.status}
});
}
  }

  export const addPost = fromData => async dispatch=> {
      try {

      }catch(err){
          
      }
  }