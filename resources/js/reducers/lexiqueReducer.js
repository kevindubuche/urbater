
import { FETCH_MOTS, NEW_MOT, EDIT_MOT,  DELETE_MOT } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    selectedItem :{}
};

export default function(state =initialState, action){
    switch(action.type){
        case FETCH_MOTS :
            return {
                ...state,
                items: action.payload.data
            }
   
         case NEW_MOT :
            return {
                ...state,
                item: action.payload
            };
        case DELETE_MOT :
            console.log(action.payload)
            return{
                ...state,
                items : state.items.filter(article => article.id !== action.payload)
            }
        case EDIT_MOT :
            console.log(action.payload)
            return{
                ...state,
                items :  state.items.map(function(item) { return item.id == action.payload.id ? action.payload : item; })
            }
            
         
           
        default:
            return state;
    }
}