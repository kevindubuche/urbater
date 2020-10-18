import { FETCH_PUBLICATIONS, FETCH_PUBLICATION, FETCH_RESULTATS_SEARCH, NEW_PUBLICATION, DELETE_PUBLICATION, CLEAR_NEW_PUBLICATION, EDIT_PUBLICATION, API_PUBLICATION , API_SEARCH} from './types';
import axios from 'axios';

//cette fonction recupere touts les articles du database et update l'etat du store
export const fetchPublications = () => dispatch => { 
        axios.get(API_PUBLICATION)
         .then(posts => dispatch({
             type : FETCH_PUBLICATIONS,
             payload : posts.data
         }))
         .catch(error => {
            console.log(error);
        });     

        }

 //cette fonction recupere une PUBLICATION du database et update l'etat du store
export const fetchPublication = (id) => dispatch => {
    console.log('fetchePUBLICATION is called');
    // console.log(API_PUBLICATION+"/"+id); 
    axios.get(API_PUBLICATION+"/"+id)
     .then(post => {dispatch({
         type : FETCH_PUBLICATION,
         payload : post.data.message
     })
    })
     .catch(error => {
        console.log(error);
    });     

    }

//cette fonction ajoute un nouveau article au database et update l'etat du store
export const createOrEditPublication = postData => dispatch => { 
    if(!postData.get('id')){
        const config = {
            headers: { "content-type": `multipart/form-data; boundary=${postData._boundary}` }
          };
        // axios.defaults.headers.post['X-CSRF-Token']=postData.token;
        axios.post(API_PUBLICATION, postData, config)
        .then(response =>{
        dispatch({
            type : NEW_PUBLICATION,
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
          axios.post(API_PUBLICATION+'/'+postData.get('id'), postData,config)
           .then(response =>{
            console.log(response.data)
            dispatch({
                type : EDIT_PUBLICATION,
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
    axios.delete(API_PUBLICATION+'/'+id).then(response =>{
        console.log(response.data)
        dispatch({
            type : DELETE_PUBLICATION,
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

//le ou fin creer yon PUBLICATION pou liberer varuable newPUBLICATION la pou system nan pa toujou we gen yon new item a chak fwa
export const clearNewPublication = () => dispatch => { 
    
        dispatch({
            type : CLEAR_NEW_PUBLICATION,
            payload : {}
        })
    
      
}


