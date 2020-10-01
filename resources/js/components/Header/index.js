import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Navbar from './Navbar';
import Search from './Search';
import MovingText from './MovingText';
import logo from '../../images/logo.png';
import SwitchLanguage from './SwitchLanguage';
import { Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginLeft:'30px',
    display:'flex',
    justifyContent:'space-between',
    flexWrap:'wrap'
 
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
              <React.Fragment>
                 <MovingText /> 
                <div style={{display:'flex', flexWrap:'wrap', flexDirection:'column'}}>
                      
                <div style={{display:'flex', flexWrap:'wrap', flexDirection:'column'}} >
                  
                      <div>
                          <SwitchLanguage  />
                      </div>
                    <div>
                      <Toolbar  > 
                            <div  style={{marginLeft:'35px'}}>
                            <Link to="/" > 
                                  <img src={logo}  width="190" height="190" alt="logo" style={{float:"left"}}></img> 
                                  </Link>  
                            </div>
                                <div>
                              
                                  <div style={{marginLeft:25}}>
                                    <div style={{fontSize:25, color:'gray'}}>URBATeR</div>
                                    <div style={{fontSize:20, color:'gray'}}>Maîtrise en Urbanisme Résilient</div>
                                    <div style={{fontSize:20, color:'gray'}}>et Aménagement des Territoires à Risques</div>
                                  </div>
                                </div>
                          
                        </Toolbar>
                    </div>
                        

                </div>
              
                      <div style={{alignSelf:'flex-end', marginRight:'60px'}}>
                          <Search />
                      </div>
                       
                  
                  
                  <div style={{paddingTop:20, paddingBottom:20}}>
                     <Navbar />
                  </div>
                </div>
              </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};