import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'; 
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {connect} from 'react-redux';
import { changeLanguage } from '../../actions/langueActions';

const theme = createMuiTheme();
const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
    width:50,
    height:20,
    float:'right',
    marginRight:70,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class SwichLanguage extends Component {
  constructor(props){
    super(props);
    this.state= {
               langue : '1',//1 FRANCAIS active et 2 CREOLE active
       }
}
handleChange  = (e) =>{
  e.preventDefault();
  this.setState({
    [e.target.id] : e.target.value
  })
  this.props.changeLanguage(e.target.value);
  console.log('langue  :'+e.target.value);
}
UNSAFE_componentWillReceiveProps(nextProps){
  if(nextProps.langue){
 console.log('langue changed successfully !'); 
}
}

render(){
  const {classes} = this.props;
  return (
<ThemeProvider theme={theme}>
    
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={this.state.langue}
          inputProps={{
            name: 'langue',
            id: 'langue',
          }}
          onChange={this.handleChange}
        >
          <option value={1}>FR</option>
          <option value={2}>HT</option>
        </NativeSelect>
      </FormControl>
    
    </ThemeProvider>
  );
}
}
SwichLanguage.propTypes = {
  changeLanguage : PropTypes.func.isRequired,
  langue: PropTypes.string,
}
const mapStateToProps =(state) => ({

  langue : state.langue.item,

});

export default connect(mapStateToProps, { changeLanguage })(withStyles (styles) (SwichLanguage) )
