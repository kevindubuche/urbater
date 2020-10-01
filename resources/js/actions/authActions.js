import { SHORT_PASSWORD, SIGNUP_SUCCESS, SIGNUP_ERROR, UNKNOWN_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, API_REGISTER, API_LOGIN} from './types';
import axios from 'axios';
import {fetchPosts} from './postActions';
import { createBrowserHistory } from "history";
const history = createBrowserHistory({forceRefresh:true});

//cette fonction ajoute un nouveau commentaire au database et update l'etat du store
export const login = (credentials) => dispatch => { 
        console.log(credentials)
        if(credentials.password.length < 6){
          return  dispatch({
                type : SHORT_PASSWORD
            })
        }
      
let token = localStorage.getItem('user');
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
axios.post(API_LOGIN,
    credentials,
    config
    ).then(response =>{
        if(response.data.success==true){
            console.log('LOGIN_SUCCESS  : '+response.data.token)
            localStorage.setItem('user',response.data.token);
            dispatch({
                type : LOGIN_SUCCESS
            })
          //  history.push("/blog"); 
     
        }
        else{
            console.log('LOGIN_ERROR  : '+response.data.message)
            dispatch({
                type : LOGIN_ERROR,
                payload : response.data
            })
            
        }
    })
    .catch(error => {
        dispatch({
            type : UNKNOWN_ERROR,
            payload : error
        })
    });  
}

//cette fonction ajoute un nouveau commentaire au database et update l'etat du store
export const signUp = (credentials) => dispatch => { 
    console.log(credentials) 
     if(credentials.password.length < 6){
      return  dispatch({
            type : SHORT_PASSWORD
        })
    }

let token = localStorage.getItem('user');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.post(API_REGISTER,
        credentials,
        config
        ).then(response =>{
            if(response.data.success==true){
                console.log('SIGNUP_SUCCESS  : '+response.data.token)
                localStorage.setItem('user','Bearer '+response.data.token);
                dispatch({
                    type : SIGNUP_SUCCESS
                })
            }
            else{
                console.log('SIGNUP_ERROR  : '+response.data.message)
                dispatch({
                    type : SIGNUP_ERROR,
                    payload : response.data
                })
                
            }
        })
        .catch(error => {
            dispatch({
                type : UNKNOWN_ERROR,
                payload : error
            })
            // console.log('problem '+error)
        });
}

export const logout = ()=>{
    localStorage.removeItem('user');
    history.push("/login"); 
}