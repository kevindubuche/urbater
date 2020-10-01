import { FETCH_POSTS, NEW_POST, DELETE_POST, CLEAR_NEW_POST, EDIT_POST, API_POST } from './types';
import axios from 'axios';

//cette fonction recupere touts les articles du database et update l'etat du store
export const fetchPosts = () => dispatch => { 
        axios.get(API_POST)
         .then(posts => dispatch({
             type : FETCH_POSTS,
             payload : posts.data
         }))
         .catch(error => {
            console.log(error);
        });     

        }

//cette fonction ajoute un nouveau article au database et update l'etat du store
export const createOrEditPost = postData => dispatch => { 
    //on verifie s'il s'agit d'un SAVe ou d'un EDIT si l'ID existe
    // let config = {
    //     headers:{'Content-type':'application/json',
    //             'X-Requestted-With': 'XMLHttpRequest',
    //             'X-CSRF-TOKEN': postData.token
    // }
    // }
    postData.token = localStorage.getItem('user')
    if(!postData.id){
        console.log('token :' +postData.token)
        console.log('data :' +postData)
        // axios.defaults.headers.post['X-CSRF-Token']=postData.token;
        axios.post(API_POST, postData).then(response =>{
        dispatch({
            type : NEW_POST,
            payload : response.data.message
        })
        })
        .catch(error => {
            console.log(error);
        })
    }
    else{
        console.log('se yon edit')
        console.log('token :' +postData.token)
        console.log('men data a: '+postData.image)
        axios.put(API_POST+'/'+postData.id, postData).then(response =>{
            console.log(response.data)
            dispatch({
                type : EDIT_POST,
                payload : response.data.message
            })
            })
            .catch(error => {
                console.log(error);
            })
    }
    
}

//cette fonction delete un article du database et update l'etat du store
export const onDelete = id => dispatch => { 
    axios.delete(API_POST+'/'+id).then(response =>{
        console.log(response.data)
        dispatch({
            type : DELETE_POST,
            payload : id
        })
        })
        .catch(error => {
            console.log(error);
        })
}

export const clearNewPost = () => dispatch => { 
    
        dispatch({
            type : CLEAR_NEW_POST,
            payload : {}
        })
    
      
}
