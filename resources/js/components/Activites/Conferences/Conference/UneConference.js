import React, { Component , Fragment} from 'react';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import image from '../../../../images/Urbater_ImageGenerique_4.jpg';
import PropTypes from 'prop-types';
import { fetchConference } from '../../../../actions/conferenceActions';
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom';
var moment  = require('moment');

class UneConference extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.fetchConference(this.props.match.params.id);
        // console.log(this.props.match.params.id);
    }

    //sim nan page Unekonbit la deja e m klike sou konbits kap deroule anle a, url la chanje but pa gen render
    //so nou veye chanjman nan url la pou refetch data yo
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id !=this.props.match.params.id ){
            this.props.fetchConference(nextProps.match.params.id);
        }
           
      
    }
   
    render(){
        return (
            <div>
                 <Grid item xs={12} sm={3}>
                 <img src={image} style={{height:'80%',width:'80%'}} />
                  {/* <img src={"/conferences_images/"+this.props.conference.image} style={{height:'80%',width:'80%'}} /> */}
                  
                  </Grid>
                     <Grid item xs={12} sm={9}>
                     <Fragment>
                             <Typography variant="caption" display="block" gutterBottom style={{ color:"#8c8c8c"}} >
                       
                             {moment(new Date(this.props.conference.created_at)).locale("fr").format('LL') } <br />
                                 {this.props.conference.author}
                         </Typography>
                         <Typography variant="h4" gutterBottom>
                          {this.props.conference.title}
                          </Typography>
                        
                       
          
                     <Typography variant="body2" gutterBottom>
                       <Fragment>
                             <div className="content" style={{fontFamily:"Arial Regular"}}  dangerouslySetInnerHTML={{__html:this.props.conference.body} }></div>   
                            </Fragment> 
                     </Typography>
                     </Fragment>
                 </Grid>
            </div>
           
           );
    }
 
}
UneConference.propTypes = {
    fetchConference : PropTypes.func.isRequired,
    // konbits : PropTypes.array.isRequired,
    conference : PropTypes.object,
}
const mapStateToProps = (state) => ({
    //  konbits : state.konbits.items,
    conference : state.conferences.item,
})
export default connect(mapStateToProps, { fetchConference })( withRouter(UneConference) );