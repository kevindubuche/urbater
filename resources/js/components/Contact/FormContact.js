import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import {connect} from 'react-redux';
import { sendEmail } from '../../actions/mailActions';

 class FormContact extends Component{
    constructor(props){
        super(props);
        this.state= {
            name : '',
            email:'',
            message : '',

            mesgFromBackend:'',
            
            
           }
   }
   componentDidMount(){
    this.setState({
        nom : '',
        email:'',
        message : '',
    })

   }
   UNSAFE_componentWillReceiveProps({nextProps}){//nou pa use redux la donc nap veye changement de article selectionner
    // if(nextProps){
    //   console.log('receive props')
    // }
   
//     if(nextProps.mail =='Mail Sent Sucssfully'){
      
//         this.setState({
//           mesgFromBackend : "Envoye"
//       })

// }
// else{
  
//     this.setState({
//       mesgFromBackend : "Message non envoye !"
//   })
// }
 
 
}
   

   handleSubmit= e =>{
    // TODO : validate
    e.preventDefault();
    this.props.sendEmail(this.state);

    this.setState({
          mesgFromBackend : this.props.mail
      })
   
    
}


   handleChange = name => ({target: {value}}) => {
    this.setState({
        
            ...this.state,
            [name]:value
        
    })
    this.setState({
      mesgFromBackend : ''
  })
}

    render(){
        
  
        return(
            <form   onSubmit={this.handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
               
                fullWidth
                id="nom"
                label= {this.props.placeholderNom}
                name="nom"
                onChange={this.handleChange('nom')}
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={this.props.placeholderMail}
                name="email"
                autoComplete="email"
                onChange={this.handleChange('email')}
          
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="message"
                label={this.props.placeholderMsg}
                type="text"
                id="message"
                multiline
                  rows="5"
                  onChange={this.handleChange('message')}
              />
           <div   style={{paddingTop:40}}></div>

           {/* <p>{this.state.mesgFromBackend=='Message non envoye !' ? <a style={{color:"green"}}>{this.state.mesgFromBackend} </a>: <a style={{color:"red"}}>{this.state.mesgFromBackend} </a> }</p> */}

              <Button
            
                type='submit'
                fullWidth
                variant="contained"
                // color="primary"
                // className={classes.submit}
                style={{textTransform: 'none'}}
              >
                {this.props.boutton}
              </Button>
            
              <Box mt={5}>
              </Box>
            </form>
        )
    }
}

const mapStateToProps =(state) => ({
  mail : state.mail.item
});
export default connect(mapStateToProps, { sendEmail })(FormContact);