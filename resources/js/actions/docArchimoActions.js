import { FETCH_DOCARCHIMOS, FETCH_DOCARCHIMO,  NEW_DOCARCHIMO, DELETE_DOCARCHIMO, CLEAR_NEW_DOCARCHIMO, EDIT_DOCARCHIMO, API_DOCARCHIMO } from './types';
import axios from 'axios';

//cette fonction recupere touts les articles du database et update l'etat du store
export const fetchDocarchimos = () => dispatch => { 
    // alert('fetcheDocarchimos is called');
        axios.get(API_DOCARCHIMO)
         .then(posts => dispatch({
             type : FETCH_DOCARCHIMOS,
             payload : posts.data
         }))
         .catch(error => {
            console.log(error);
        });     

        }

 //cette fonction recupere une annonce du database et update l'etat du store
export const fetchDocarchimo = (id) => dispatch => {
    // alert('fetcheDocarchimo is called');
    // console.log(API_ANNONCE+"/"+id); 
    axios.get(API_DOCARCHIMO+"/"+id)
     .then(post => {dispatch({
         type : FETCH_DOCARCHIMO,
         payload : post.data.message
     })
    })
     .catch(error => {
        console.log(error);
    });     

    }

//cette fonction ajoute un nouveau article au database et update l'etat du store
export const createOrEditDocArchimo = postData => dispatch => { 
    // postData.token = localStorage.getItem('user')
//    alert(postData.get('id'));
    
    if(!postData.get('id')){
        // alert('in save');
        // console.log('token :' +postData.token)
        // console.log('data :' +postData)
        // axios.defaults.headers.post['X-CSRF-Token']=postData.token;
        // alert(postData.document.name);
        const config = {
            headers: { "content-type": `multipart/form-data; boundary=${postData._boundary}` }
          };
        axios.post(API_DOCARCHIMO, postData,config )
        .then(response =>{
        dispatch({
            type : NEW_DOCARCHIMO,
            payload : response.data.message
        })
        })
        .catch(error => {
            if(error.response){
                console.log(error);
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
        // alert('se yon edit')
        // console.log('token :' +postData.token)
        // console.log('men data a: '+postData.image)

        // alert(typeof(parseInt(postData.get('id'))));
       const config = {
            headers: { "content-type": `multipart/form-data; boundary=${postData._boundary}` }
          };
        axios.post(API_DOCARCHIMO+'/'+postData.get('id'), postData,config)
        .then(response =>{
            console.log(response.data)
            dispatch({
                type : EDIT_DOCARCHIMO,
                payload : response.data.message
            })
            })
            .catch(error => {
               
                console.log(error);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.header);
            })
    }
    
}

//cette fonction delete un article du database et update l'etat du store
export const onDelete = id => dispatch => { 
    axios.delete(API_DOCARCHIMO+'/'+id).then(response =>{
        console.log(response.data)
        dispatch({
            type : DELETE_DOCARCHIMO,
            payload : id
        })
        })
        .catch(error => {
            console.log(error);
        })
}

//le ou fin creer yon annonce pou liberer varuable newAnnonce la pou system nan pa toujou we gen yon new item a chak fwa
export const clearNewDocarchimo = () => dispatch => { 
    
        dispatch({
            type : CLEAR_NEW_DOCARCHIMO,
            payload : {}
        })
    
      
}


