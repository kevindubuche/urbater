import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDocarchimos } from '../../../../actions/docarchimoActions';
import ListDocarchimos from './ListDocarchimos';

 class AllDocarchimos extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.fetchDocarchimos();
     }

    render(){
        return (    
            <ListDocarchimos docarchimos={this.props.docarchimos} />
           );
         }
    
}
AllDocarchimos.propTypes = {
    fetchDocarchimos : PropTypes.func.isRequired,
    docarchimos : PropTypes.array.isRequired,
    newDocarchimos : PropTypes.object,
 
}
const mapStateToProps =(state) => ({
    docarchimos : state.docarchimos.items,
        newDocarchimos : state.docarchimos.item,
      
});
export default connect(mapStateToProps,{ fetchDocarchimos })(AllDocarchimos)


