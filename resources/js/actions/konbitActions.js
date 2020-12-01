import { FETCH_KONBITS, FETCH_KONBIT,  NEW_KONBIT, DELETE_KONBIT, CLEAR_NEW_KONBIT, EDIT_KONBIT, API_KONBIT } from './types';
import axios from 'axios';

//cette fonction recupere touts les articles du database et update l'etat du store
export const fetchKonbits = () => dispatch => { 
        axios.get(API_KONBIT)
         .then(posts => dispatch({
             type : FETCH_KONBITS,
             payload : posts.data
         }))
         .catch(error => {
            console.log(error);
        });     

        }

 //cette fonction recupere une annonce du database et update l'etat du store
export const fetchKonbit = (id) => dispatch => {
    console.log('fetcheKonbit is called');
    // console.log(API_ANNONCE+"/"+id); 
    axios.get(API_KONBIT+"/"+id)
     .then(post => {dispatch({
         type : FETCH_KONBIT,
         payload : post.data.message
     })
    })
     .catch(error => {
        console.log(error);
    });     

    }

//cette fonction ajoute un nouveau article au database et update l'etat du store
export const createOrEditKonbit = postData => dispatch => { 
    // postData.token = localStorage.getItem('user')
 
    if(!postData.get('id')){
        const config = {
            headers: { "content-type": `multipart/form-data; boundary=${postData._boundary}` }
          };
        // axios.defaults.headers.post['X-CSRF-Token']=postData.token;
        axios.post(API_KONBIT, postData, config).then(response =>{
        dispatch({
            type : NEW_KONBIT,
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
        const config = {
            headers: { "content-type": `multipart/form-data; boundary=${postData._boundary}` }
          };
   
        axios.post(API_KONBIT+'/'+postData.get('id'), postData, config).then(response =>{
            console.log(response.data)
            dispatch({
                type : EDIT_KONBIT,
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
    axios.delete(API_KONBIT+'/'+id).then(response =>{
        console.log(response.data)
        dispatch({
            type : DELETE_KONBIT,
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
export const clearNewKonbit = () => dispatch => { 
    
        dispatch({
            type : CLEAR_NEW_KONBIT,
            payload : {}
        })
    
      
}


