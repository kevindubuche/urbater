
import {  NEW_MAIL} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    selectedItem :{}
};

export default function(state =initialState, action){
    switch(action.type){
         case NEW_MAIL :
            return {
                ...state,
                item: action.payload
            };
           
        default:
            return state;
    }
}