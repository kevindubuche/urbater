import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

  
import Form from './Form';

export default class Create extends Component{
    constructor(props){
         super(props);
         this.state={
            opneModal :false
            
        }
   
    }

    handleToggle = () => {
        this.setState({
            opneModal : !this.state.opneModal
            
        })
    }

    render(){
        const {opneModal} = this.state
        return(
            <Fragment>
                 {this.state.opneModal==true ? 
               <Button  variant='contained' color='secondary' onClick={this.handleToggle} >
               Annuler
           </Button>
               :<Button   onClick={this.handleToggle} >
               <AddCircleRoundedIcon
                 fontSize="large"/>
           </Button>
            }
                
              {this.state.opneModal==true ? 
               <Form closeModal={this.handleToggle}/>
               :''
            }      
        </Fragment>
        )
    }
}

