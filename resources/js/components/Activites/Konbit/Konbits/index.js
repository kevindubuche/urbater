import React from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


import TabKonbit from './TabKonbit';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../../Style/GeneralJSX';
import data from './Konbit.json';
import {useSelector} from 'react-redux';

export default function Konbit() {
  const store = useSelector(store=>store);
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
        <ExpansionPanelSummary
      
        >
          <div className={classes.column}>
            <Typography variant="h5"  className={classes.title} style={{marginLeft:"-25px"}}>KONBIT</Typography>
          </div>
        
        </ExpansionPanelSummary>
  
      
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom style={{fontFamily:"Arial Regular", color:"black"}}>
               {TEXT.titleDefinition}
              </Typography>
                <Typography variant="body2" gutterBottom>
                {TEXT.definition}
              </Typography>
           </Grid>

           <Grid item xs={12} sm={6}>
                
                <Typography variant="body2" gutterBottom style={{paddingTop:30}}>
              {TEXT.raison}
              </Typography>
           </Grid>
          </Grid>
       
                   <TabKonbit />
            </Grid>
            
         </Grid>
      </div>
    </div>
  );
}
