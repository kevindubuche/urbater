import React from 'react';
import clsx from 'clsx';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import presentation from '../../../images/Urbater_ImageGenerique_1.jpg';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';
import data from './LiensUtiles.json';
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
    <div className={classes.root} id="presentation">
      <Divider />
      <div >
        <ExpansionPanelSummary >
          <div className={classes.column}>
          
          </div>
        
        </ExpansionPanelSummary>
  

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Paper>
                <img src={presentation}  style={style.image}/>
                 </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>

            <Typography variant="h5" className={classes.title}>  {TEXT.title}</Typography>
            
              <Link href="https://fds.edu.ht/site/"  >{TEXT.link1}</Link><br /><Divider /><div style={{paddingTop:30}} />
              <Link href="https://fds.edu.ht/site/" >{TEXT.link2} </Link><br /><Divider /><div style={{paddingTop:30}} />
              <Link href="https://web.umons.ac.be/fr/" >{TEXT.link3}</Link><br /><Divider /><div style={{paddingTop:30}} />
              <Link href="https://www.uliege.be/cms/c_8699436/en/uliege" >{TEXT.link4} </Link><br /><Divider />
            
               
            </Grid>
            
         </Grid>
      </div>
    </div>
  );
}
