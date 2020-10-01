import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {fetchResultats} from '../../actions/searchActions';


import { withRouter } from 'react-router-dom';

 class Search extends React.Component {
  constructor(props){
    super(props);
    this.state= {
               keyWords : '',
       }
}

  handleChange = (e)  => {
    this.setState({
           keyWords: e.target.value
    })
    console.log(e.target.value);
    // this.props.fetchResultats(value);
    // this.props.history.push('/resultats'); 
}
handleSubmit =() =>{
  if(this.state.keyWords !=''){
      this.props.fetchResultats(this.state);
  this.props.history.push('/resultats'); 
  }

}
// UNSAFE_componentWillReceiveProps(nextProps){
//   console.log('new props receive')
//   if(nextProps.resultatsSearch){
    
  
//   }

// }

  render(){
    
  return (
    <div>
     <FormControl  variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Mot clé</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type='text' 
            value={this.state.keyWords}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                {/* <Link to="/resultats"> */}
                 <Button onClick={this.handleSubmit}>
                   <SearchIcon />
                </Button>
                {/* </Link> */}

              </InputAdornment>
            }
            style={{height:45, width:200}}
          />
        </FormControl>
   
    </div>
  );
  }
}

Search.propTypes = {
  fetchResultats : PropTypes.func.isRequired,
  resultatsSearch : PropTypes.array.isRequired,
  
}
const mapStateToProps =(state) => ({
  resultatsSearch : state.resultatsSearch.items,

});

export default connect(mapStateToProps, { fetchResultats })(withRouter(Search)) 