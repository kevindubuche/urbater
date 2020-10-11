
import { FETCH_DOCARCHIMOS, FETCH_DOCARCHIMO,  NEW_DOCARCHIMO, EDIT_DOCARCHIMO, CLEAR_NEW_DOCARCHIMO, DELETE_DOCARCHIMO } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    selectedItem :{}
};

export default function(state =initialState, action){
    switch(action.type){
        case FETCH_DOCARCHIMOS :
            return {
                ...state,
                items: action.payload.data
            }
        case FETCH_DOCARCHIMO :
            return {
                ...state,
                item: action.payload
            }
         case NEW_DOCARCHIMO :
            return {
                ...state,
                item: action.payload
            };
        case DELETE_DOCARCHIMO :
            console.log(action.payload)
            return{
                ...state,
                items : state.items.filter(article => article.id !== action.payload)
            }
        case EDIT_DOCARCHIMO :
            console.log(action.payload)
            return{
                ...state,
                items :  state.items.map(function(item) { return item.id == action.payload.id ? action.payload : item; })
            }
            case CLEAR_NEW_DOCARCHIMO :
                return {
                    ...state,
                    item: action.payload
                };
         
           
        default:
            return state;
    }
}