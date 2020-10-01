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
import UneThese from './UneThese';
import presentation from '../images/presentation.jpg';


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';

export default function Presentation() {
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
            <Typography variant="h5" className={classes.title} style={{marginLeft:"-25px"}}>THESES</Typography>
          </div>
        
        </ExpansionPanelSummary>
  
        
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
            <UneThese />
            </Grid>
            <Grid item xs={12} sm={3}>
            <UneThese />
            </Grid>
            <Grid item xs={12} sm={3}>
            <UneThese />
            </Grid>
            <Grid item xs={12} sm={3}>
            <UneThese />
            </Grid>
         </Grid>
       
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
            <UneThese />
            </Grid>
            <Grid item xs={12} sm={3}>
            <UneThese />
            </Grid>
            <Grid item xs={12} sm={3}>
            <UneThese />
            </Grid>
            <Grid item xs={12} sm={3}>
            <UneThese />
            </Grid>
         </Grid>
    
      </div>
    </div>
  );
}
