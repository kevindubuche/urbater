import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

import Partenaires from './Partenaires';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import logo from '../../images/logo.png';
import {Link as OtherLink} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        www.urbater.org
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
    paddingTop:200,
   
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;
  return (
    <footer className={classes.footer}>
        <Partenaires />
      <Container maxWidth="lg" style={{display:'flex', flexWrap:'wrap', flexDirection:'column'}}>
    
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        
        </Typography>
        <div style={{float:"left", paddingLeft:100, paddingTop:120}}>
                <Link color="inherit" href="https://web.facebook.com/urbater"> <FacebookIcon /></Link> 
                <Link color="inherit" href="https://www.google.com/">  <TwitterIcon/></Link> 
                <Link color="inherit" href="https://www.google.com/">  <InstagramIcon/></Link> 
                <br /><br />
     
       <OtherLink to='/contact' >
         <Typography color='textSecondary'>
           <HomeIcon />
           27, rue Toussaint Louverture, Delmas 33 (Local du Laboratoire National du Bâtiment et des Travaux Publics)
         </Typography>
        </OtherLink>
       
         <OtherLink to='/contact'  >
         <Typography color='textSecondary'>
       <MailIcon />
      urbater@ueh.edu.ht
       </Typography>
        </OtherLink> 
       <OtherLink to='/contact'  >
       <Typography color='textSecondary'>
       <PhoneIcon />
        +509 31 35 9233
       </Typography>
        </OtherLink>
    
        </div>
     
        
        {/* <img src={logo} width={"60px"} height={"60px"}  style={{marginRight:180, alignSelf:'flex-end'}}/>
         */}
       
        <div style={{justifyContent:'center', alignItems:'flex-end'}}>
          <Copyright /> 
        </div>
        
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};