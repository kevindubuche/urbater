import { NEW_COMMENT, FETCH_COMMENTS, CLEAR_NEW_COMMENT, DELETE_COMMENT, API_COMMENT} from './types';
import axios from 'axios';


//cette fonction ajoute un nouveau commentaire au database et update l'etat du store
export const createComment = commentData => dispatch => { 
        console.log(commentData)
        axios.post(API_COMMENT, commentData).then(response =>{
        dispatch({
            type : NEW_COMMENT,
            payload : response.data
        })
        })
        .catch(error => {
            console.log(error);
        }) 
}

//cette fonction recupere touts les commentaires associes a un article et update l'etat du store
export const fetchComments = idArticle => dispatch => { 
    axios.get(API_COMMENT+'/'+idArticle)
     .then(posts => dispatch({
         type : FETCH_COMMENTS,
         payload : posts.data
     }))
     .catch(error => {
        console.log(error);
    });     

    }
    
    
export const clearNewComment = () => dispatch => { 
    
    dispatch({
        type : CLEAR_NEW_COMMENT,
        payload : {}
    }) 
}

//cette fonction delete un article du database et update l'etat du store
export const onDeleteComment = id => dispatch => { 
    axios.delete(API_COMMENT+'/'+id).then(response =>{
        console.log(response.data)
        dispatch({
            type : DELETE_COMMENT,
            payload : id
        })
        })
        .catch(error => {
            console.log(error);
        })
}