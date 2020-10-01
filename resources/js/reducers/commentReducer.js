
import {NEW_COMMENT, FETCH_COMMENTS, DELETE_COMMENT, CLEAR_NEW_COMMENT } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    selectedItem :{}
};

export default function(state =initialState, action){
    switch(action.type){
         case NEW_COMMENT :
            return {
                ...state,
                item: action.payload
            };
        case FETCH_COMMENTS :
        return {
            ...state,
            items: action.payload
        }
        case CLEAR_NEW_COMMENT :
            return {
                ...state,
                item: action.payload
            };
        case DELETE_COMMENT :
            console.log(action.payload)
            return{
                ...state,
                items : state.items.filter(comment => comment.id !== action.payload)
            }
        default:
            return state;
    }
}