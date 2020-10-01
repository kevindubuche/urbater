
import { FETCH_KONBITS, FETCH_KONBIT,  NEW_KONBIT, EDIT_KONBIT, CLEAR_NEW_KONBIT, DELETE_KONBIT } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    selectedItem :{}
};

export default function(state =initialState, action){
    switch(action.type){
        case FETCH_KONBITS :
            return {
                ...state,
                items: action.payload.data
            }
        case FETCH_KONBIT :
            return {
                ...state,
                item: action.payload
            }
         case NEW_KONBIT :
            return {
                ...state,
                item: action.payload
            };
        case DELETE_KONBIT :
            console.log(action.payload)
            return{
                ...state,
                items : state.items.filter(article => article.id !== action.payload)
            }
        case EDIT_KONBIT :
            console.log(action.payload)
            return{
                ...state,
                items :  state.items.map(function(item) { return item.id == action.payload.id ? action.payload : item; })
            }
            case CLEAR_NEW_KONBIT :
                return {
                    ...state,
                    item: action.payload
                };
         
           
        default:
            return state;
    }
}