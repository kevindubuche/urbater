import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStateResultats } from '../../../actions/searchActions';
import ListResultats from './ListResultats';

 class AllResultats extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.getStateResultats();
     }

    render(){
        return (    
            <ListResultats resultatsSearch={this.props.resultatsSearch} />
           );
         }
    
}
AllResultats.propTypes = {
    getStateResultats : PropTypes.func.isRequired,
    resultatsSearch : PropTypes.array.isRequired,
 
}
const mapStateToProps =(state) => ({
    resultatsSearch : state.resultatsSearch.items,
        // newAnnonce : state.annonces.item,
      
});
export default connect(mapStateToProps,{ getStateResultats })(AllResultats)


