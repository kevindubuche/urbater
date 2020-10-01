import React from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import direction from '../marc.jpg';

import TabConference from './TabConference';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';

export default function Direction() {
  const classes = useStyles();
  const style ={
    image: {
      
        width: '100%',
        height: '10%',
        padding :'3%',
    }
}

  return (
    <div className={classes.root} id="direction">
      <Divider />
      <div >
        <ExpansionPanelSummary
          // expandIcon={<ExpandMoreIcon />}
          // aria-controls="panel1c-content"
          // id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>U R B A T E R</Typography>
          </div>
        
        </ExpansionPanelSummary>
  
        <Divider />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                   <TabConference />
            </Grid>
            
         </Grid>
      </div>
    </div>
  );
}
