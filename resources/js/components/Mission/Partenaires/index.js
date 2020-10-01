import React from 'react';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import partenaires from '../images/partenaires.png';
import logo from '../images/logo.png';
import Link from '@material-ui/core/Link';
import LesPartenaires from './Partenaires';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';


import data from './Partenaires.json';
import {useSelector} from 'react-redux';
export default function Partenaires() {
  const store = useSelector(store => store);
  const TEXT = store.langue.item == '1' ?data.francais : data.creole;

  const classes = useStyles();
  const style ={
    image: {
      
        width: '100%',
        height: '10%'
    }
}

  return (
    <div className={classes.root} 
    //  style={{backgroundColor:"white"}}
     >
     
      <Divider />
      <div >
        <ExpansionPanelSummary  >
          <div className={classes.column}>
            <Typography variant="h5" className={classes.title} style={{marginLeft:"-25px"}}>  {TEXT.title}</Typography>
          </div>
        
        </ExpansionPanelSummary>
{/* 
          <Grid container spacing={3} style={{paddingTop:40}}>
            <Grid item xs={12} sm={12}>          
                <LesPartenaires/>
            </Grid>
            
         </Grid> */}
      </div>
     
    
    </div>
  );
}
