
import { FETCH_POSTS, NEW_POST, EDIT_POST, CLEAR_NEW_POST, DELETE_POST } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    selectedItem :{}
};

export default function(state =initialState, action){
    switch(action.type){
        case FETCH_POSTS :
            return {
                ...state,
                items: action.payload.data
            }
         case NEW_POST :
            return {
                ...state,
                item: action.payload
            };
        case DELETE_POST :
            console.log(action.payload)
            return{
                ...state,
                items : state.items.filter(article => article.id !== action.payload)
            }
        case EDIT_POST :
            console.log(action.payload)
            return{
                ...state,
                items :  state.items.map(function(item) { return item.id == action.payload.id ? action.payload : item; })
            }
            case CLEAR_NEW_POST :
                return {
                    ...state,
                    item: action.payload
                };
         
           
        default:
            return state;
    }
}