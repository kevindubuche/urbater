import React, { Component} from 'react';

import List from './List';

export default  class Lexique extends Component {
    constructor(props){
        super(props);
        this.state={
            lexique:[]
        }
    }
    componentDidMount(){
            axios.get('/api/lexique')
              .then(res =>{
                console.log(res.data.data);
                 this.setState({
                   lexique: res.data.data})
              })
              .catch(err => {
                console.log(err);
              })
              }
    

    render(){
        console.log(this.state.lexique)
        return (    
            <List lexique={this.state.lexique} />
           );
         }


        }