import React from 'react';
import clsx from 'clsx';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import partenaires from '../../../images/Urbater_ImageGenerique_1.jpg';
import {Link} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';
import data from './Stage.json';
import {useSelector } from 'react-redux';

export default function Partenaires() {
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
                <img src={partenaires}  style={style.image}/>
                 </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
          <Typography variant="h5" className={classes.title}> {TEXT.title}</Typography>
                <div className={classes.body}>{TEXT.body}</div>    

                <Link to="/mission/partenaires" >   
  <Button  variant="contained"  style={{marginTop:50}} >{TEXT.button}</Button>
          </Link>
            </Grid>
            
         </Grid>
      </div>
      <br />
       
    
    </div>
  );
}
