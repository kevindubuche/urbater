import React, {Fragment} from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import fondation from '../images/prof.jpg';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useStyles from '../../Style/GeneralJSX';

import data from './Internationale.json';
import {useSelector} from 'react-redux';

import UnProf from './UnProf';
export default function Fondation() {
  const store = useSelector(store => store);
  const TEXT = store.langue.item == '1' ?data.francais : data.creole;
  const classes = useStyles();
  const style ={
    image: {
      
        width: '100%',
        height: '10%',
        padding :'3%',
    }
}
const image = <AccountCircleIcon style={{height:'200px',width:'200px' , padding:'15px', color:"gray"}}/>
  return (
    <div className={classes.root} >
      <Divider />
      <div >
        
  
          <Grid container spacing={3}>
              <Grid item xs={12} sm={6} className={classes.body}> 
                <ExpansionPanelSummary>
                  <div className={classes.column}>
                    <Typography className={classes.title} style={{marginLeft:'-25px'}}>{TEXT.title}</Typography>
                  </div>
                </ExpansionPanelSummary>
                    {TEXT.body1} 
              </Grid>
              <Grid item xs={12} sm={6} className={classes.body}> 
                  <ExpansionPanelSummary >
                      <div className={classes.column} >
                        <Typography className={classes.title} style={{marginLeft:'-15px'}}>{TEXT.title2}</Typography>
                      </div>
                  </ExpansionPanelSummary>
                  {TEXT.body2}
              </Grid>
         </Grid>

        {/* LISTE DES PROFS */}
          <Grid container spacing={1} style={{marginTop:40}}>
          {TEXT.profs.map((prof, index)=>
             
          <Fragment key={index}>
            <Grid item xs={12} sm={4}>
               <UnProf 
             nom={prof.nom}
             titre={prof.titre}
             email={prof.email}
             phone={prof.phone}
             diplomes={prof.diplomes}
             biographie={prof.biographie}
             cours={prof.cours}
             expertise={prof.expertise}
             />
            </Grid>
          </Fragment>
           
              )}
          
         </Grid>
         {/* <Grid container spacing={3}>
         <Grid item xs={12} sm={6} className={classes.body}> 
              
          </Grid>
           <Grid item xs={12} sm={6} className={classes.body}> 
              
              
          </Grid>
         
         </Grid> */}
      </div>
    </div>
  );
}
