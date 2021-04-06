import { REGISTER_SUCCESS,
                LOGIN_SUCCESS,
                USER_LOADED, REGISTER_SEND_EMAIL} from '../Actions/Types';
import isEmpty from '../utlis/isEmpty'
import setAuthToken from '../utlis/setAuthToken';

const initialState = {isAuthenticated: false, 
    user:{}, loading:false};

export default  function(state= initialState, action) {
   const { payload, type } = action;
   console.log('payload',payload)
   switch(type){
    case REGISTER_SEND_EMAIL:
        return{...state, ...payload, loading:false, isEmailSend:true}; 
    // case REGISTER_SUCCESS:
    //        case LOGIN_SUCCESS:
    //        localStorage.setItem("jwtToken", payload.token);
    //        return{...state, ...payload, isAuthenticated:true, loading:false};

       case REGISTER_SUCCESS:
           case LOGIN_SUCCESS:

           localStorage.setItem("jwtToken", payload.token);
           return{...state, ...payload, isAuthenticated:true, loading:false};

        case USER_LOADED:

            return{...state, isAuthenticated: !isEmpty(payload),    //////////////////////
                user:payload}
           default:
               return state;
   }
}