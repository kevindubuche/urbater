
import {SIGNUP_SUCCESS, SIGNUP_ERROR, SHORT_PASSWORD, LOGIN_SUCCESS, LOGIN_ERROR, UNKNOWN_ERROR} from '../actions/types';

const initialState = {
    authResponse: null
};

export default function(state =initialState, action){
    switch(action.type){
         case SHORT_PASSWORD :
            return {
                ...state,
                authResponse: 'Password is too short'
            };
        case SIGNUP_SUCCESS :
        return {
            ...state,
            authResponse: 'Sign up successfully done'
        }
        case SIGNUP_ERROR :
            // console.log(action.payload);
            return {
                ...state,
                authResponse: action.payload.message,
            };
        case LOGIN_SUCCESS :
            return {
                ...state,
                authResponse: 'Redirection en cours...'
            }
        case LOGIN_ERROR :
            // console.log(action.payload);
            return {
                ...state,
                authResponse: action.payload.message
            };
        case UNKNOWN_ERROR :
                return {
                    ...state,
                    authResponse: 'There seems to be a problem, please try aigain later'
                };
       
        default:
            return state;
    }
}