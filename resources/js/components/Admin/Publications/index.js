import React from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';
import Index2 from './Index2';
import NavAdmin from '../NavAdm';

export default function Annonces() {
  const classes = useStyles();
  const style ={
    image: {
      
        width: '100%',
        height: '10%',
        padding :'3%',
    }
}

  return (
    <div className={classes.root}>
      <Divider />
      <div >
        <ExpansionPanelSummary
          
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>PUBLICATIONS</Typography>
          </div>
        <NavAdmin />
        </ExpansionPanelSummary>
  
        <Divider />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              
           <Index2 />
          
            </Grid>
            
         </Grid>
      </div>
    </div>
  );
}
