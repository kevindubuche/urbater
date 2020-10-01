import React from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';

import direction from '../../../images/Urbater_ImageGenerique_1.jpg';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../Style/GeneralJSX';

import data from './Direction.json';
import {useSelector} from 'react-redux';
export default function Direction() {
  
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
                <img src={direction}  style={style.image}/>
                 </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
 
                <div  className={classes.body}> 
                  <Typography variant="h5"  className={classes.title}>{TEXT.title}</Typography>
                <div >
              
                <Typography  variant="h6" gutterBottom>
              {TEXT.directeur.nom}
          </Typography>
          
          <Typography  variant="subtitle2" gutterBottom >
              {TEXT.directeur.titre}
          </Typography>
          <Typography  variant="subtitle2" gutterBottom >
              {TEXT.directeur.email}
          </Typography>
          <Typography  variant="subtitle2" gutterBottom >
              {TEXT.directeur.phone}
          </Typography>
          
          <br/>
          </div>

                {TEXT.directeur.diplomes.map((diplome, ind)=>
                <div >
          <Typography variant="subtitle2" key={ind}  gutterBottom>
              {diplome}
          </Typography>
          </div>
          )}   
          <div >
           <br/>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Biographie</strong> 
              </Typography>
          {TEXT.directeur.biographie} </div>
          <div >
           <br/>
            <Typography variant="subtitle2" gutterBottom>
            <strong>Cours</strong> 
            </Typography>
            {TEXT.directeur.cours.map((cour,ind)=>
              <Typography key={ind} variant="body2" gutterBottom>
              {cour}
            </Typography>
            )}
        </div>
        <div >
         <br/>
            <Typography variant="subtitle2" gutterBottom>
            <strong>Expertise</strong> 
            </Typography>
            {TEXT.directeur.expertise.map((ex, ind)=>
            <Typography key={ind} variant="body2" gutterBottom>
                {ex}
            </Typography>
            )} 

              </div>

                
                </div>
            </Grid>
            
         </Grid>
      </div>
    </div>
  );
}
