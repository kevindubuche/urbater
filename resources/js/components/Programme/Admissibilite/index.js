import React from 'react';
import clsx from 'clsx';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import fondation from '../../../images/Urbater_ImageGenerique_3.jpg';
import {Link} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';
import data from './Admissibilite.json';
import {useSelector} from 'react-redux';

export default function Fondation() {
  const store = useSelector(store => store);
  const TEXT = store.langue.item =='1' ?data.francais : data.creole;
  const classes = useStyles();
  const style ={
    image: {
      
        width: '100%',
        height: '10%'
    }
}

  return (
    <div className={classes.root} id="fondation">
      <Divider />
      <div >
        <ExpansionPanelSummary   >
          <div className={classes.column}>
            
          </div>
        
        </ExpansionPanelSummary>
  
       
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              
            <Paper>
                <img src={fondation}  style={style.image}/>
                 </Paper>
       
            </Grid>
            <Grid item xs={12} sm={6} >
            <Typography variant="h5" className={classes.title}>{TEXT.title}</Typography>
                <div className={classes.body}>{TEXT.body}</div>
                <a href="/files/formulaire.pdf" target='_blank' >   
  <Button  variant="contained" disableElevation style={{marginTop:50}} >{TEXT.button}</Button>
          </a>
             
            </Grid>
            
         </Grid>
         
          <Grid container spacing={1}>
           
           
         </Grid>
      </div>
    </div>
  );
}
