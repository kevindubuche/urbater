import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CircularProgress from '@material-ui/core/CircularProgress';

import OpenOneArticle from './OpenOneArticle';

class AllArticles extends Component {
    constructor(props){
        super(props);
        this.state={
           localArticle: {
               id :'',
               title : 'Bienvenue !',
               body:'Selectionnez un article dans la liste ci-contre.',
               author : '',
               source : '',
               created_at: '',
               updated_at : ''
               
           },
           isLoading : true
       }
   }

   UNSAFE_componentWillMount(){
    this.props.fetchPosts();
    }
    componentDidMount() {
        this.setState({isLoading: false})
    }
    render(){
        return (
           this.state.isLoading ? <CircularProgress />:  
            <div>
                <Grid item xm= {12} sm={12} md={12} >
               
                            <Paper >
                            {this.props.posts.map(( article, index) => 
                                <Fragment key={index}>
                                    <h2>{article.title}</h2>
                                  <h6 > Auteur : {article.author} </h6>
                                  <h6> Publie le : {article.created_at} </h6>
                                  <h6> Source : {article.source} </h6>
                                  <img src={"/articles_images/"+article.image} width={200} height={200} />
                                    <Fragment>
                                        <div className="content" dangerouslySetInnerHTML={{__html:article.body} }></div>   
                                    </Fragment> 
                                    <br />
                                 <OpenOneArticle article={article}/>

                                </Fragment>  
                                )}
                            </Paper>
            
                    </Grid>
            </div>
        );
    }
    
}


AllArticles.propTypes = {
    fetchPosts : PropTypes.func.isRequired,
    posts : PropTypes.array.isRequired,
    newPost : PropTypes.object
}
const mapStateToProps = (state) =>({
    posts : state.posts.items,
});
export default connect (mapStateToProps,{ fetchPosts})(AllArticles);
