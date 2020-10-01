
import { FETCH_RESULTATS_SEARCH, GET_STATE_RESULTATS} from '../actions/types';

const initialState = {
    items: [],
    // item: {},
    // selectedItem :{}
};

export default function(state =initialState, action){
    switch(action.type){
        case FETCH_RESULTATS_SEARCH :
        console.log('nan reducer a :'+action.payload);
        console.log('STATE SHOULD UPDATE')
            return {
                ...state,
                items: action.payload
            }
         case GET_STATE_RESULTATS :
                return {
                    ...state,
                    items: initialState.items
                }
     
        default:
            return state;
    }
}