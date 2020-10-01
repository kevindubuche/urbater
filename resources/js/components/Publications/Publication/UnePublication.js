import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import image from '../../../images/Urbater_ImageGenerique_4.jpg';
import PropTypes from 'prop-types';
import { fetchPublication } from '../../../actions/publicationActions';
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom';
var moment  = require('moment');
// const Image= <img style={{height:'250px',width:'250px', borderRadius:'125px'}} src={require('../marc.jpg')} />

class UnePublication extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.fetchPublication(this.props.match.params.id);
        // console.log(this.props.match.params.id);
    }

    //sim nan page UnePublication la deja e m klike sou annonces kap deroule anle a, url la chanje but pa gen render
    //so nou veye chanjman nan url la pou refetch data yo
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id !=this.props.match.params.id ){
            this.props.fetchPublication(nextProps.match.params.id);
        }
           
      
    }
   
    render(){
       
        return (
            
            <div>
                 <Grid item xs={12} sm={3}>
                 <img src={image} style={{height:'80%',width:'80%'}} />
                  {/* <img src={"/publications_images/"+this.props.publication.image} style={{height:'80%',width:'80%'}} /> */}
                  
                  </Grid>
                     <Grid item xs={12} sm={9}>
                     <Fragment>
                             <Typography variant="caption" display="block" gutterBottom style={{ color:"#8c8c8c"}} >
                             {/* {this.props.publication.created_at} */}
      
                            
                             {moment(new Date(this.props.publication.created_at)).locale("fr").format('LL') }
                              <br />
                                 {this.props.publication.author}
                         </Typography>
                         <Typography variant="h4" gutterBottom style={{fontFamily:"Arial Regular"}}>
                          {this.props.publication.title}
                          </Typography>
                             
                         <Typography variant="body2" gutterBottom>
                         <Fragment>
                             <div className="content" style={{fontFamily:"Arial Regular"}}  dangerouslySetInnerHTML={{__html:this.props.publication.body} }></div>   
                            </Fragment>  
                         </Typography>
                     </Fragment>
                 </Grid>
            </div>
           
           );
    }
 
}
UnePublication.propTypes = {
    fetchPublication : PropTypes.func.isRequired,
    // Publications : PropTypes.array.isRequired,
    publication : PropTypes.object,
}
const mapStateToProps = (state) => ({
    //  annonces : state.annonces.items,
    publication : state.publications.item,
})
export default connect(mapStateToProps, { fetchPublication })( withRouter(UnePublication) );