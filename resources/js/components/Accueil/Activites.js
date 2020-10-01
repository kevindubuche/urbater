import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchKonbits } from '../../actions/konbitActions';
import { fetchConferences } from '../../actions/conferenceActions';

import image from '../../images/Urbater_ImageGenerique_4.jpg';
var moment  = require('moment');
 class AllKonbits extends Component {
    constructor(props){
        super(props);
    }

    UNSAFE_componentWillMount(){
        this.props.fetchKonbits();
        this.props.fetchConferences();
     }
    render(){
        return (
            <div >
                  <Grid container spacing={0}>

                    {/* CONFERENCES */}
                    <Fragment >
                  {this.props.conferences.slice(0, 3).map(( conference, index) => 
                   <Fragment key={index} >
                         <Grid item xs={12} sm={3}>
                         <Link to={"/conference/"+conference.id}> 
                         <img src={image} width={"80%"} height={"80%"}  />
                         </Link>

                                   {/* <img src={"/conferences_images/"+conference.image} width={"80%"} height={"80%"}  /> */}
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Fragment>
                                            <Typography variant="caption" display="block" gutterBottom style={{ color:"#8c8c8c"}} >
                                            
                                                {moment(new Date(conference.created_at)).locale("fr").format('LL') }
                                        </Typography>
                                        
                                        <Link to={"/conference/"+conference.id}> 
                                        <Typography
                                         variant="body1"
                                          gutterBottom style={{ fontWeight:"bold",
                                          fontFamily:"Arial Regular",
                                          color:"black"}}>
                                        {conference.title}
                                         </Typography>
                                        </Link>
                                        <Typography 
                                        variant="body2" 
                                        gutterBottom
                                        style={{fontFamily:"Arial Regular"}}>
                                        {conference.resume}
                                    </Typography>
                                    </Fragment>
                                </Grid>

                               <br /> <br /> <br /> <br />
                               </Fragment >
                  )}
                              
                            </Fragment>   







                      {/* KONBIT */}
                  <Fragment >
                  {this.props.konbits.slice(0, 2).map(( konbit, index) => 
                   <Fragment key={index} >
                         <Grid item xs={12} sm={3}>
                         <Link to={"/konbit/"+konbit.id}> 
                            <img src={image} width={"80%"} height={"80%"}  />
                        </Link>
                                   {/* <img src={"/konbits_images/"+konbit.image} width={"80%"} height={"80%"}  /> */}
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Fragment>
                                            <Typography variant="caption" display="block" gutterBottom style={{ color:"#8c8c8c"}} >
                                            
                                                {moment(new Date(konbit.created_at)).locale("fr").format('LL') }
                                        </Typography>
                                        
                                        <Link to={"/konbit/"+konbit.id}> 
                                        <Typography
                                         variant="body1"
                                          gutterBottom style={{ fontWeight:"bold",
                                          fontFamily:"Arial Regular",
                                          color:"black"}}>
                                        {konbit.title}
                                         </Typography>
                                        </Link>
                                        <Typography 
                                        variant="body2" 
                                        gutterBottom
                                        style={{fontFamily:"Arial Regular"}}>
                                        {konbit.resume}
                                    </Typography>
                                    </Fragment>
                                </Grid>

                               <br /> <br /> <br /> <br />
                               </Fragment >
                  )}
                   <Grid item xs={12} sm={3}></Grid>
                  <Grid item xs={12} sm={9} style={{paddingTop:40}}>
                               <Link to='/activites/conferences'>Voir plus</Link>
                               </Grid>
                             
                            </Fragment>   
                       
                     </Grid>
            </div>
        );
    }
    
}
AllKonbits.propTypes = {
    fetchKonbits : PropTypes.func.isRequired,
    konbits : PropTypes.array.isRequired,
    newKonbit : PropTypes.object,

    fetchConferences : PropTypes.func.isRequired,
    conferences : PropTypes.array.isRequired,
    newConference : PropTypes.object,
 
}
const mapStateToProps =(state) => ({
        konbits : state.konbits.items,
        newKonbit : state.konbits.item,

        conferences : state.conferences.items,
        newConference : state.conferences.item,
      
});
export default connect(mapStateToProps,{ fetchKonbits, fetchConferences })(AllKonbits)


