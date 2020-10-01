import React, { Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import { createComment } from '../../actions/commentActions';

import { withStyles } from '@material-ui/styles';
const styles = theme =>({
    FormControl :{
        width :300
    }
})
 class FormComment extends Component{
    constructor(props){
        super(props);
        this.state= {
            comment :{
                   user : '',
                   idArticle:'',
                   comment:'',
                   created_at: '',
                   updated_at : ''
            
               }
           }
   }

   componentDidMount(){
    this.setState({
        comment : {...this.state.comment,
            idArticle : this.props.article.id
        }
    })

}

   handleSubmit= e =>{
    // TODO : validate

    e.preventDefault();
    this.props.createComment(this.state.comment);
    this.setState({
        comment :{
            user : '',
            idArticle: this.props.article.id,
            comment:'',
            created_at: '',
            updated_at : ''
     //on reset tout sauf l'id de l'article
        }
    })
   
}

   handleChange = name => ({target: {value}}) => {
    this.setState({
        comment :{
            ...this.state.comment,
            [name]:value
        }
    })
}

    render(){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <h3>Ecrire un commentaire :</h3>
                <br />
            <TextField
                label="Nom et Prenom"
                onChange={this.handleChange('user')}
                value={this.state.comment.user}
                margin="normal"
                required={true}
                className={this.props.classes.FormControl}
                /> 
                <br />
                 <TextField
                label="Votre commentaire"
                multiline
                rows="4"
                onChange={this.handleChange('comment')}
                value={this.state.comment.comment}
                margin="normal"
                className={this.props.classes.FormControl}
                />
                <br />
                <Button
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    onClick={this.handleSubmit}>
                   Envoyer
                  </Button>
                  
            </form>
        )
    }
}

FormComment.propTypes = {
    createComment : PropTypes.func.isRequired
}
export default connect(null, { createComment })(withStyles (styles) (FormComment) )