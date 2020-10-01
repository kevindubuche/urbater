import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAnnonces } from '../../actions/annonceActions';

 class MovingText extends Component {
    constructor(props){
        super(props);
    }

    UNSAFE_componentWillMount(){
        this.props.fetchAnnonces();
     }
    render(){
        return (
            <div style={{marginRight:'75px', marginLeft:'50px', marginBottom:40}} >
                           
                           <marquee behavior="scroll" direction="left">
                               {this.props.annonces.slice(0,5).map((annonce, index)=>
                               <Fragment key={index}>
                                     <Link
                                      style={{color:"gray"}}
                                       to={"/annonce/"+annonce.id}>{annonce.title} | </Link> 
                               </Fragment>
                                   
                               )}
                       </marquee>
            </div>
        );
    }
    
}

MovingText.propTypes = {
    fetchAnnonces : PropTypes.func.isRequired,
    annonces : PropTypes.array.isRequired,
    newAnnonce : PropTypes.object, 
}
const mapStateToProps =(state) => ({
        annonces : state.annonces.items,
        newAnnonce : state.annonces.item,
      
});
export default connect(mapStateToProps,{ fetchAnnonces })( withRouter(MovingText))

