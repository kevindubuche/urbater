import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import ImageWelcome from './ImageWelcome';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Annonces from './Annonces';
import Activites from './Activites';

import './accueil.css';
import Box from '@material-ui/core/Box';
import {useSelector} from 'react-redux';
import data from './Accueil.json';
export default function Accueil (props) {
    const store = useSelector(store => store);
    console.log(store.langue);
    const TEXT = store.langue.item == '1' ?data.francais : data.creole;
  
  
        const mainFeaturedPost = {
          image: 'https://source.unsplash.com/random',
            imgText: 'main image description',
           
          };
        return (
            <div >
                <ImageWelcome post={mainFeaturedPost} />
                <Grid container spacing={3} style={{backgroundColor:"white"}}>
                    <Grid item xs={12} sm={6}>
                        <div > 
                            <Typography variant="h6" display="block" gutterBottom className='annoncesTitle'> 
                                <Box display="flex" justifyContent="center"  style={{ backgroundColor:"#414342"}}>
                                    <Box p={1} >
                                        <Link to="annonces">
                                            <Typography
                                            variant="h6"
                                            display="block"
                                            gutterBottom className='annoncesTitle'
                                            style={{color:"white",
                                            backgroundColor:"#414342", 
                                            fontFamily:"Arial",
                                            fontWeight:'bold'}}>
                                            {TEXT.annonces} 
                                        </Typography>
                                        </Link> 
                                    </Box>
                                </Box>
                            </Typography>
                            
                             <Annonces />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div > 
                            <Typography variant="h6" display="block" gutterBottom className='annoncesTitle'> 
                                <Box display="flex" justifyContent="center"  style={{ backgroundColor:"#414342"}}>
                                    <Box p={1} >
                                        <Link to="activites/konbits">
                                            <Typography 
                                                variant="h6"
                                                display="block"
                                                gutterBottom 
                                                className='annoncesTitle'
                                                style={{color:"white", 
                                                backgroundColor:"#414342",
                                                    fontFamily:"Arial",
                                                    fontWeight:'bold'}}
                                                > 
                                                {TEXT.activites}
                                            </Typography>
                                        </Link> 
                                    </Box>
                                </Box>
                            </Typography>
                         
                            
                            <Activites />
                        </div >
                    </Grid>
               </Grid>
            </div>
        );
    
}



