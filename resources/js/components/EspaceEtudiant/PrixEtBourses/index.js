import React from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import objectifs from '../../../images/Urbater_ImageGenerique_2.jpg';


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';
import data from './PrixEtBourses.json';
import {useSelector } from 'react-redux';
export default function Demarche() {
  const store = useSelector(store => store);
  const TEXT = store.langue.item == '1' ? data.francais : data.creole;
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
            
          </div>
        
        </ExpansionPanelSummary>
  
      
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Paper>
                <img src={objectifs}  style={style.image}/>
                 </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
          <Typography variant="h5" className={classes.title}> {TEXT.title}</Typography>
              <h6><strong>{TEXT.titlePrixCorvington}</strong></h6>
                <div className={classes.body}>{TEXT.body}</div>
                </Grid>
            
         </Grid>
      </div>
    </div>
  );
}
