import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import image from '../../../images/Urbater_ImageGenerique_1.jpg';
import PropTypes from 'prop-types';
import { fetchAnnonce } from '../../../actions/annonceActions';
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom';
var moment  = require('moment');
// const Image= <img style={{height:'250px',width:'250px', borderRadius:'125px'}} src={require('../marc.jpg')} />

class UneAnnonce extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.fetchAnnonce(this.props.match.params.id);
        // console.log(this.props.match.params.id);
    }

    //sim nan page UneAnnonce la deja e m klike sou annonces kap deroule anle a, url la chanje but pa gen render
    //so nou veye chanjman nan url la pou refetch data yo
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id !=this.props.match.params.id ){
            this.props.fetchAnnonce(nextProps.match.params.id);
        }
           
      
    }
   
    render(){
       
        return (
            
            <div>
                 <Grid item xs={12} sm={3}>

                 <img src={image} style={{height:'80%',width:'80%'}} />
                  {/* <img src={"/annonces_images/"+this.props.annonce.image} style={{height:'80%',width:'80%'}} /> */}
                  
                  </Grid>
                     <Grid item xs={12} sm={9}>
                     <Fragment>
                             <Typography variant="caption" display="block" gutterBottom style={{ color:"#8c8c8c"}} >
                             {/* {this.props.annonce.created_at} */}
      
                             {moment(new Date(this.props.annonce.created_at)).locale("fr").format('LL') }
                              <br />
                                 {this.props.annonce.author}
                         </Typography>
                         <Typography variant="h4" gutterBottom style={{fontFamily:"Arial Regular"}}>
                          {this.props.annonce.title}
                          </Typography>
                             
                         <Typography variant="body2" gutterBottom>
                         <Fragment>
                             <div className="content" style={{fontFamily:"Arial Regular"}}  dangerouslySetInnerHTML={{__html:this.props.annonce.body} }></div>   
                            </Fragment>  
                         </Typography>
                     </Fragment>
                 </Grid>
            </div>
           
           );
    }
 
}
UneAnnonce.propTypes = {
    fetchAnnonce : PropTypes.func.isRequired,
    // annonces : PropTypes.array.isRequired,
    annonce : PropTypes.object,
}
const mapStateToProps = (state) => ({
    //  annonces : state.annonces.items,
    annonce : state.annonces.item,
})
export default connect(mapStateToProps, { fetchAnnonce })( withRouter(UneAnnonce) );