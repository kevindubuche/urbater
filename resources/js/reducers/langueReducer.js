
import {  LANGUE_FRANCAISE, LANGUE_CREOLE } from '../actions/types';

const initialState = {
    item: '1',
};

export default function(state =initialState, action){
    switch(action.type){
        case LANGUE_FRANCAISE :
            return {
                ...state,
                item: action.payload
            }
        case LANGUE_CREOLE :
            return {
                ...state,
                item: action.payload
            }
        
           
        default:
            return state;
    }
}