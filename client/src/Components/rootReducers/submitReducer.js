import { REGISTER_SUCCESS,
                LOGIN_SUCCESS} from '../Actions/Types';
import isEmpty from '../utlis/isEmpty'
import setAuthToken from '../utlis/setAuthToken';

const initialState = {isAuthenticated: false, 
    user:{}, loading:false};

export default  function(state= initialState, action) {
   const { payload, type } = action;
   switch(type){
       case REGISTER_SUCCESS:
           case LOGIN_SUCCESS:
           localStorage.setItem("jwtToken", payload.token);
           return{...state, ...payload, isAuthenticated:true, loading:false};
           default:
               return state;
   }
}