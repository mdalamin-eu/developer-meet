export default (state= {value:''}, action)=>{
    switch(action.type){
    case 'REGISTER_USER ':
        return{...state, value:action.payload};
        default:
            return state
    }
}