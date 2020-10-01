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
import { login } from '../../actions/authActions';

import { withRouter } from 'react-router-dom';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.urbater.com/">
        www.urbater.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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

 class LoginForm extends Component {
  
  constructor(props) {
    super(props);
    this.state= {
      email : '',
      password:''
 
}
  }
  
  handleChange  = (e) =>{
    e.preventDefault();
    this.setState({
        [e.target.id] : e.target.value
    })
}
handleSubmit = (e) =>{
    e.preventDefault();
    console.log('ready to log in');
    console.log(this.state);
    this.props.login(this.state)
   // console.log('history :'+JSON.stringify(history))
 // history.push('/')
    

}
UNSAFE_componentWillReceiveProps=(nextProps)=>{
    if(nextProps.authResponse =='Redirection en cours...'){

            // this.props.handleClose()
          // this.props.history.push('/blog'); 
          this.props.history.push('/admin'); 
       
       
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
          Se connecter
          </Typography>
          <form className={classes.form}  onSubmit={this.handleSubmit}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            
           <p>{this.props.authResponse!=null && this.props.authResponse !="" ? this.props.authResponse :null }</p>
             
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                 
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {""}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
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

const step1= withStyles(styles)(LoginForm);
export default connect(mapStateToProps,{ login })(withRouter (step1));
