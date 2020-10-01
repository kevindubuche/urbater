import React, { useState, useEffect } from 'react';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';

import TabPublications from './TabPublications';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';
import data from './Publications.json';
import {useSelector} from 'react-redux';
import Loading from './Loading';
export default function Direction() {
  const store = useSelector(store =>store);
  const TEXT = store.langue.item == '1' ? data.francais : data.creole;

  const [ spinner, setSpinner ] = useState(true);

  // It will be executed before rendering

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500)
  }, []);

  const classes = useStyles();
  const style ={
    image: {
      
        width: '100%',
        height: '10%',
    }
}

  return (
    spinner==true ? <Loading/> : 
    <div className={classes.root} >
      <Divider />
        <ExpansionPanelSummary  >
          <div className={classes.column}>
            <Typography  variant="h5" className={classes.title} style={{marginLeft:"-25px"}}>{TEXT.title}</Typography>
          </div>
        
        </ExpansionPanelSummary>
  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                   <TabPublications />
            </Grid>
            
         </Grid>
   
    </div>
  );
}
