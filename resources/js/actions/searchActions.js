import { FETCH_RESULTATS_SEARCH, GET_STATE_RESULTATS, API_SEARCH} from './types';
import axios from 'axios';

    export const fetchResultats = postData => dispatch => { 
        console.log('fetch resultats is called');
            console.log('data :' +postData)
            axios.post(API_SEARCH, postData).then(response =>{
                console.log('nan action nan '+JSON.stringify(response.data.data))
            dispatch({
                type : FETCH_RESULTATS_SEARCH,
                payload : response.data.data
            })
            
            // history.push("/resultats"); 
            })
            .catch(error => {
                    console.log(error);
            })
       
    }

    
    export const getStateResultats = () => dispatch => { 
      dispatch({
             type : GET_STATE_RESULTATS
         })
  
        }
