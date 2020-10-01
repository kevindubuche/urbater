import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAnnonces } from '../../../actions/annonceActions';
import ListAnnonces from './ListAnnonces';

 class AllAnnonces extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.fetchAnnonces();
     }

    render(){
        return (    
            <ListAnnonces annonces={this.props.annonces} />
           );
         }
    
}
AllAnnonces.propTypes = {
    fetchAnnonces : PropTypes.func.isRequired,
    annonces : PropTypes.array.isRequired,
    newAnnonce : PropTypes.object,
 
}
const mapStateToProps =(state) => ({
        annonces : state.annonces.items,
        newAnnonce : state.annonces.item,
      
});
export default connect(mapStateToProps,{ fetchAnnonces })(AllAnnonces)


