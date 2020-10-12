import { FETCH_CONFERENCES, FETCH_CONFERENCE,  NEW_CONFERENCE, DELETE_CONFERENCE, CLEAR_NEW_CONFERENCE, EDIT_CONFERENCE, API_CONFERENCE } from './types';
import axios from 'axios';

//cette fonction recupere touts les articles du database et update l'etat du store
export const fetchConferences = () => dispatch => { 
        axios.get(API_CONFERENCE)
         .then(posts => dispatch({
             type : FETCH_CONFERENCES,
             payload : posts.data
         }))
         .catch(error => {
            console.log(error);
        });     

        }

 //cette fonction recupere une annonce du database et update l'etat du store
export const fetchConference = (id) => dispatch => {
    console.log('fetcheCONFERENCE is called');
    // console.log(API_ANNONCE+"/"+id); 
    axios.get(API_CONFERENCE+"/"+id)
     .then(post => {dispatch({
         type : FETCH_CONFERENCE,
         payload : post.data.message
     })
    })
     .catch(error => {
        console.log(error);
    });     

    }

//cette fonction ajoute un nouveau article au database et update l'etat du store
export const createOrEditConference = postData => dispatch => { 
    postData.token = localStorage.getItem('user')
    if(!postData.id){
        console.log('token :' +postData.token)
        console.log('data :' +postData)
        // axios.defaults.headers.post['X-CSRF-Token']=postData.token;
        axios.post(API_CONFERENCE, postData).then(response =>{
        dispatch({
            type : NEW_CONFERENCE,
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
                window.location.href = "/login";
            }
            
        })
    }
    else{
        console.log('se yon edit')
        console.log('token :' +postData.token)
        console.log('men data a: '+postData.image)
        axios.put(API_CONFERENCE+'/'+postData.id, postData).then(response =>{
            console.log(response.data)
            dispatch({
                type : EDIT_CONFERENCE,
                payload : response.data.message
            })
            })
            .catch(error => {
                console.log(error);
                if(error.response.status==401){
                    console.log('ou pa gen authorisasion mon frere');
                    window.location.href = "/login";
                }
            })
    }
    
}

//cette fonction delete un article du database et update l'etat du store
export const onDelete = id => dispatch => { 
    axios.delete(API_CONFERENCE+'/'+id).then(response =>{
        console.log(response.data)
        dispatch({
            type : DELETE_CONFERENCE,
            payload : id
        })
        })
        .catch(error => {
            console.log(error);
            if(error.response.status==401){
                console.log('ou pa gen authorisasion mon frere');
                window.location.href = "/login";
            }
        })
}

//le ou fin creer yon annonce pou liberer varuable newAnnonce la pou system nan pa toujou we gen yon new item a chak fwa
export const clearNewConference = () => dispatch => { 
    
        dispatch({
            type : CLEAR_NEW_CONFERENCE,
            payload : {}
        })
    
      
}


