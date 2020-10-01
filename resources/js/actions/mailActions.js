import { NEW_MAIL, API_MAIL} from './types';
import axios from 'axios';


//cette fonction ajoute un nouveau article au database et update l'etat du store
export const sendEmail = postData => dispatch => { 
    // postData.token = localStorage.getItem('user')
   
        // console.log('token :' +postData.token)
        console.log('data :' +postData)
        // axios.defaults.headers.post['X-CSRF-Token']=postData.token;
        axios.post(API_MAIL, postData).then(response =>{
        dispatch({
            type : NEW_MAIL,
            payload : response.data.message
        })
        console.log('message :' +response.data.message)
        alert('Message envoyé avec succès !\nMerci');
        })
        .catch(error => {
            alert('Message non envoyé  !\nEssayez ultérieurement\nMerci');
            if(error.response){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.header);
            }
            if(error.response.status==401){
                console.log('Pas l\'authorisasion');
            }
            
        })
}



