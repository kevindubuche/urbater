import { LANGUE_FRANCAISE, LANGUE_CREOLE } from './types';

//cette fonction ajoute un nouveau article au database et update l'etat du store
export const changeLanguage = (langue) => dispatch => { 
    if(langue==1){//j'aimerais activer le francais
        console.log('chanje lang vers francais :' +langue)
        dispatch({
            type : LANGUE_FRANCAISE,
            payload : langue
        })

    }
    else{
        console.log('chanje lang vers creole :' +langue)
        dispatch({
            type : LANGUE_CREOLE,
            payload : langue
        })
    }
    
}
