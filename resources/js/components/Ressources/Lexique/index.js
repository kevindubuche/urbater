import React from 'react';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import GetLexique from './GetLexique';
import {Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';
import data from './Lexique.json';
import { useSelector } from 'react-redux';

export default function Presentation() {
  const store = useSelector(store => store);
  const TEXT = store.langue.item == '1' ?data.francais : data.creole;

  const classes = useStyles();
  const style ={
    image: {
      
        width: '100%',
        height: '10%',
    }
}

  return (
    <div className={classes.root} >
      <Divider />
      <div >
        <ExpansionPanelSummary  >
          <div className={classes.column}>
            <Typography variant="h5" className={classes.title} style={{marginLeft:"-25px"}}>{TEXT.title}</Typography>
          </div>
        
        </ExpansionPanelSummary>
  
      
          <Grid container spacing={3}
          direction="column"
  alignItems="center"
  justify="center">
  
            <Grid item xs={12} sm={12} >
          
                <div className={classes.body} style={{marginBottom:80}}>{TEXT.body}</div>
                
                 
            </Grid>
            <Grid item xs={12} sm={12} >
                   <Link to="/contact" >   
                      <Button  variant="contained" disableElevation style={{marginBottom:50, backgroundColor:"#33453"}} >{TEXT.button}</Button>
                    </Link>
                
            </Grid>
            <Grid item xs={12} sm={12} >
          
                  <GetLexique />
                 
            </Grid>
         </Grid>
      </div>
    </div>
  );
}
