
import { FETCH_PUBLICATIONS, FETCH_PUBLICATION,  NEW_PUBLICATION, EDIT_PUBLICATION, CLEAR_NEW_PUBLICATION, DELETE_PUBLICATION } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    selectedItem :{}
};

export default function(state =initialState, action){
    switch(action.type){
        case FETCH_PUBLICATIONS :
            return {
                ...state,
                items: action.payload.data
            }
        case FETCH_PUBLICATION :
            return {
                ...state,
                item: action.payload
            }
         case NEW_PUBLICATION :
            return {
                ...state,
                item: action.payload
            };
        case DELETE_PUBLICATION :
            console.log(action.payload)
            return{
                ...state,
                items : state.items.filter(article => article.id !== action.payload)
            }
        case EDIT_PUBLICATION :
            console.log(action.payload)
            return{
                ...state,
                items :  state.items.map(function(item) { return item.id == action.payload.id ? action.payload : item; })
            }
            case CLEAR_NEW_PUBLICATION :
                return {
                    ...state,
                    item: action.payload
                };
         
           
        default:
            return state;
    }
}