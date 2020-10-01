import { FETCH_ANNONCES, FETCH_ANNONCE, FETCH_RESULTATS_SEARCH, NEW_ANNONCE, DELETE_ANNONCE, CLEAR_NEW_ANNONCE, EDIT_ANNONCE, API_ANNONCE , API_SEARCH} from './types';
import axios from 'axios';

//cette fonction recupere touts les articles du database et update l'etat du store
export const fetchAnnonces = () => dispatch => { 
        axios.get(API_ANNONCE)
         .then(posts => dispatch({
             type : FETCH_ANNONCES,
             payload : posts.data
         }))
         .catch(error => {
            console.log(error);
        });     

        }

 //cette fonction recupere une annonce du database et update l'etat du store
export const fetchAnnonce = (id) => dispatch => {
    console.log('fetcheAnnonce is called');
    // console.log(API_ANNONCE+"/"+id); 
    axios.get(API_ANNONCE+"/"+id)
     .then(post => {dispatch({
         type : FETCH_ANNONCE,
         payload : post.data.message
     })
    })
     .catch(error => {
        console.log(error);
    });     

    }

//cette fonction ajoute un nouveau article au database et update l'etat du store
export const createOrEditAnnonce = postData => dispatch => { 
    postData.token = localStorage.getItem('user')
    if(!postData.id){
        console.log('token :' +postData.token)
        console.log('data :' +postData)
        // axios.defaults.headers.post['X-CSRF-Token']=postData.token;
        axios.post(API_ANNONCE, postData).then(response =>{
        dispatch({
            type : NEW_ANNONCE,
            payload : response.data.message
        })
        })
        .catch(error => {
            if(error.response){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.header);
            }
            if(error.response.status==401){
                console.log('ou pa gen authorisasion mon frere');
            }
            
        })
    }
    else{
        console.log('se yon edit')
        console.log('token :' +postData.token)
        console.log('men data a: '+postData.image)
        axios.put(API_ANNONCE+'/'+postData.id, postData).then(response =>{
            console.log(response.data)
            dispatch({
                type : EDIT_ANNONCE,
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
    axios.delete(API_ANNONCE+'/'+id).then(response =>{
        console.log(response.data)
        dispatch({
            type : DELETE_ANNONCE,
            payload : id
        })
        })
        .catch(error => {
            console.log(error);
        })
}

//le ou fin creer yon annonce pou liberer varuable newAnnonce la pou system nan pa toujou we gen yon new item a chak fwa
export const clearNewAnnonce = () => dispatch => { 
    
        dispatch({
            type : CLEAR_NEW_ANNONCE,
            payload : {}
        })
    
      
}


