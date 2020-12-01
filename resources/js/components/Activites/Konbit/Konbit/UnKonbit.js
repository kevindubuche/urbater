import React, { Component , Fragment} from 'react';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import image from '../../../../images/Urbater_ImageGenerique_4.jpg';
import PropTypes from 'prop-types';
import { fetchKonbit } from '../../../../actions/konbitActions';
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom';
var moment  = require('moment');

class UnKonbit extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.fetchKonbit(this.props.match.params.id);
        // console.log(this.props.match.params.id);
    }

    //sim nan page Unekonbit la deja e m klike sou konbits kap deroule anle a, url la chanje but pa gen render
    //so nou veye chanjman nan url la pou refetch data yo
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id !=this.props.match.params.id ){
            this.props.fetchKonbit(nextProps.match.params.id);
        }
           
      
    }
   
    render(){
        return (
            <div>
                 <Grid item xs={12} sm={3}>
                 <img src={image} style={{height:'80%',width:'80%'}} />
                  {/* <img src={"/konbits_images/"+this.props.konbit.image} style={{height:'80%',width:'80%'}} /> */}
                  
                  </Grid>
                     <Grid item xs={12} sm={9}>
                     <Fragment>
                             <Typography variant="caption" display="block" gutterBottom style={{ color:"#8c8c8c"}} >
                           
                             {moment(new Date(this.props.konbit.created_at)).locale("fr").format('LL') }<br />
                                 {this.props.konbit.author}
                         </Typography>
                         <Typography variant="h4" gutterBottom>
                          {this.props.konbit.title}
                          </Typography>
                        
                       
          
                          <Fragment>
                             <div className="content" dangerouslySetInnerHTML={{__html:this.props.konbit.body} }></div>   
                          </Fragment>  
                          <br></br>
                          {this.props.konbit.filename ?
                        <a href = {"/konbit_files/"+this.props.konbit.filename} target = "_blank">Télécharger </a>      
                        : '' }
                     </Fragment>
                 </Grid>
            </div>
           
           );
    }
 
}
UnKonbit.propTypes = {
    fetchKonbit : PropTypes.func.isRequired,
    // konbits : PropTypes.array.isRequired,
    konbit : PropTypes.object,
}
const mapStateToProps = (state) => ({
    //  konbits : state.konbits.items,
    konbit : state.konbits.item,
})
export default connect(mapStateToProps, { fetchKonbit })( withRouter(UnKonbit) );