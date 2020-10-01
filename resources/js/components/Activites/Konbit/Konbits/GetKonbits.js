import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchKonbits } from '../../../../actions/konbitActions';
import ListKonbits from './ListKonbits';

 class AllKonbits extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.fetchKonbits();
     }

    render(){
        return (    
            <ListKonbits konbits={this.props.konbits} />
           );
         }
    
}
AllKonbits.propTypes = {
    fetchKonbits : PropTypes.func.isRequired,
    konbits : PropTypes.array.isRequired,
    newKonbit : PropTypes.object,
 
}
const mapStateToProps =(state) => ({
        konbits : state.konbits.items,
        newKonbit : state.konbits.item,
      
});
export default connect(mapStateToProps,{ fetchKonbits })(AllKonbits)


