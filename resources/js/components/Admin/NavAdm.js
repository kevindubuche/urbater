import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import CreateDialog from './Blogs/Create';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';

import {logout} from '../../actions/authActions';

export default class NavAddm extends Component{  
  render(){
    return(
      <AppBar >
          <Toolbar>
          <Typography variant="h5" color="inherit" style={{flex : 1}}>
               Administrateur
           </Typography>
        
           <Link to="/admin/lexique">
                <Button>Lexique</Button>
              </Link>
              <Link to="/admin/conferences">
                <Button>Conferences</Button>
              </Link>
              <Link to="/admin/annonces">
                <Button>Annonces</Button>
              </Link>
              <Link to="/admin/konbits">
                <Button>Konbit</Button>
              </Link>
              <Link to="/admin/publications">
                <Button>Publications</Button>
              </Link>
              <Link to="/admin/register">
                <Button>Add Admin</Button>
              </Link>
            
                <Button onClick={logout}>Logout</Button>
          

        
          </Toolbar>
      </AppBar>
    )
  }

}


