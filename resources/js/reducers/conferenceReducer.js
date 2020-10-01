
import { FETCH_CONFERENCES, FETCH_CONFERENCE,  NEW_CONFERENCE, EDIT_CONFERENCE, CLEAR_NEW_CONFERENCE, DELETE_CONFERENCE } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    selectedItem :{}
};

export default function(state =initialState, action){
    switch(action.type){
        case FETCH_CONFERENCES :
            return {
                ...state,
                items: action.payload.data
            }
        case FETCH_CONFERENCE :
            return {
                ...state,
                item: action.payload
            }
         case NEW_CONFERENCE :
            return {
                ...state,
                item: action.payload
            };
        case DELETE_CONFERENCE :
            console.log(action.payload)
            return{
                ...state,
                items : state.items.filter(article => article.id !== action.payload)
            }
        case EDIT_CONFERENCE :
            console.log(action.payload)
            return{
                ...state,
                items :  state.items.map(function(item) { return item.id == action.payload.id ? action.payload : item; })
            }
            case CLEAR_NEW_CONFERENCE :
                return {
                    ...state,
                    item: action.payload
                };
         
           
        default:
            return state;
    }
}