import { FETCH_MOTS, NEW_MOT, DELETE_MOT, EDIT_MOT, API_LEXIQUE } from './types';
import axios from 'axios';

//cette fonction recupere touts les articles du database et update l'etat du store
// export const fetchMots = () => dispatch => { 
//     console.log('fetchMots is called');
//         axios.get(API_LEXIQUE)
//          .then(posts => dispatch({
//              type : FETCH_MOTS,
//              payload : posts.data
//          }))
//          .catch(error => {
//             console.log(error);
//         });     

//         }


//cette fonction ajoute un nouveau article au database et update l'etat du store
export const createOrEditMot = postData => dispatch => { 
    postData.token = localStorage.getItem('user')
    if(!postData.id){
        console.log('token :' +postData.token)
        console.log('data :' +postData)
        // axios.defaults.headers.post['X-CSRF-Token']=postData.token;
        axios.post(API_LEXIQUE, postData).then(response =>{
        dispatch({
            type : NEW_MOT,
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
        axios.put(API_LEXIQUE+'/'+postData.id, postData).then(response =>{
            console.log(response.data)
            dispatch({
                type : EDIT_MOT,
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






export const addMot = (mot)=>{
    console.log('wap delete mot');
    mot.token = localStorage.getItem('user')
    axios.post(API_LEXIQUE, mot)
    .then(res =>{
      console.log(res.data.message);
    })
    .catch(er => {
      console.log(er);
    })
  }



export  const editMot = (mot)=>{
    console.log('wap delete mot');
    mot.token = localStorage.getItem('user')
    axios.put(API_LEXIQUE+"/"+mot.id, mot)
    .then(res =>{
      console.log(res.data.message);
    })
    .catch(er => {
      console.log(er);
    })
  }
//cette fonction delete un article du database et update l'etat du store
export const deleteMot = (id)=>{
    console.log('wap delete mot');
    axios.delete(API_LEXIQUE+"/"+id)
    .then(res =>{
      console.log(res);
    })
    .catch(er => {
      console.log(er);
    })
  }