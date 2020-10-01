import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import { connect } from 'react-redux';
import { signUp } from '../../../actions/authActions';

import { withRouter } from 'react-router-dom';

const theme = createMuiTheme();

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

 class RegisterForm extends Component {
  
  constructor(props){
    super(props);
    this.state= {
                 name : '',
               email : '',
               password:'',
               confirmPassword:'',
               errorText:false
          
       }
}

handleChange  = (e) =>{
  e.preventDefault();
  this.setState({
      [e.target.id] : e.target.value,
      errorText:false
  })
}
handleSubmit = (e) =>{
  e.preventDefault();
  if(this.state.password === this.state.confirmPassword){

  console.log('ready to register');
  console.log(this.state);
  this.props.signUp(this.state);
  this.setState({
    errorText:false
  })
  }
  else{
    this.setState({
      errorText:true
    })
  }

}


  render(){
const {classes} = this.props;
  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Add Admin
          </Typography>
          <form className={classes.form}  onSubmit={this.handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nom et Prenoms"
              name="name"
              autoFocus
              type="text"
              onChange={this.handleChange}
             
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              required
            />
                <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirmer mot de passe"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={this.handleChange}
              required
              error ={this.state.errorText == true ? true : false }
            />
           
            
           <p>{this.props.authResponse!=null && this.props.authResponse !="" ? this.props.authResponse :null }</p>
             
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             Add
            </Button>
       
           
          </form>
        </div>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
  }
}
const mapStateToProps =(state) => ({
  authResponse : state.user.authResponse
});

const step1= withStyles(styles)(RegisterForm);
export default connect(mapStateToProps,{ signUp })(withRouter (step1));
