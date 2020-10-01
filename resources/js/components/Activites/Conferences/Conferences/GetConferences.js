import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchConferences } from '../../../../actions/conferenceActions';
import ListConferences from './ListConferences';

 class AllConferences extends Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        this.props.fetchConferences();
     }

    render(){
        return (    
            <ListConferences conferences={this.props.conferences} />
           );
         }
    
}
AllConferences.propTypes = {
    fetchConferences : PropTypes.func.isRequired,
    conferences : PropTypes.array.isRequired,
    newConference : PropTypes.object,
 
}
const mapStateToProps =(state) => ({
    conferences : state.conferences.items,
        newConference : state.conferences.item,
      
});
export default connect(mapStateToProps,{ fetchConferences })(AllConferences)


