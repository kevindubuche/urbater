import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPublications } from '../../../actions/publicationActions';
import ListPublications from './ListPublications';

 class AllPublications extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.fetchPublications();
     }

    render(){
        return (    
            <ListPublications publications={this.props.publications} />
           );
         }
    
}
AllPublications.propTypes = {
    fetchPublications : PropTypes.func.isRequired,
    publications : PropTypes.array.isRequired,
    newPublication : PropTypes.object,
 
}
const mapStateToProps =(state) => ({
        publications : state.publications.items,
        newPublication : state.publications.item,
      
});
export default connect(mapStateToProps,{ fetchPublications })(AllPublications)


