import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/commentActions';
import { clearNewComment } from '../../actions/commentActions';
import { onDeleteComment } from '../../actions/commentActions';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
 
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class AllComments extends Component {
    constructor(props){
        super(props);
        this.state={
            confirmDelete :false,
            idCommentDelete : '',
            comment :{
                user : '',
                idArticle:'',
                comment:'',
                created_at: '',
                updated_at : ''
         
            }
       }
   }

   UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.newComment){
    
         if(nextProps.newComment.id )//on verifie si y a un nouveau commentaire pour afficher un alert
       {
        this.props.comments.unshift(nextProps.newComment); //on ajoute le nouveau article en tete de liste
           console.log('New commentaire added successfully !');
           console.log(nextProps.newComment);
        this.setState({
            openAlert :true
        })
        this.props.clearNewComment();
       } 
    
    }
  
}

   UNSAFE_componentWillMount(){
    this.props.fetchComments(this.props.idArticle);
    }

    handleCloseAlert = () => {
        this.setState({
            openAlert :false
        })
        }

        confirmDelete = (id) => {
            this.setState({
                confirmDelete :true,
                idCommentDelete : id
            })
            
            }

            agreeDeleteDialog = ()=> {
                this.props.onDeleteComment(this.state.idCommentDelete);
                this.setState({
                    confirmDelete :false,
                    openAlert :true
                  
                })
            }
    
            handleCloseDeleteDialog=()=>{
                this.setState({
                    confirmDelete :false
                })
            }
    
    render(){
        return (
            <div className="container">
                <Grid item xm= {12} sm={12} md={12} >
                            <Paper >
                                <h5>Commentaires</h5>
                            {this.props.comments.map(( comment, index) => 
                                <Fragment key={index}>
                                  <h6 > Auteur : {comment.user} </h6> 
                                  <h6> Publie le : {comment.created_at} </h6>
                                  <h6> {comment.comment} </h6>
                                  {/* nap afiche button delete la nan manage, pa pou public la */}
                                  {this.props.canDelete==true ?
                                 <IconButton onClick ={()=>this.confirmDelete(comment.id)}>
                                     <Delete />
                                  </IconButton> 
                                  : ''}
                                 
                             
                                    <br />
                                </Fragment>  
                                )}
                            </Paper>
                            <Snackbar open={this.state.openAlert} autoHideDuration={4000} onClose={this.handleCloseAlert}>
                                <Alert onClose={this.handleCloseAlert} severity="success">
                                    Action executee avec succes !
                                </Alert>
                          </Snackbar>
                          <Dialog
                            open={this.state.confirmDelete}
                            TransitionComponent={Transition}
                            keepMounted
                            // onClose={handleCloseDeleteDialog}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Confirmer la suppression de ce commentaire"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={()=>this.handleCloseDeleteDialog()} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={()=>this.agreeDeleteDialog()} color="primary">
                                Confirmer
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
            </div>
        );
    }
    
}


AllComments.propTypes = {
    fetchComments : PropTypes.func.isRequired,
    comments : PropTypes.array.isRequired,
    newComment : PropTypes.object,
    clearNewComment : PropTypes.func.isRequired,
    onDeleteComment : PropTypes.func.isRequired,
}
const mapStateToProps = (state) =>({
    comments : state.comments.items,
    newComment : state.comments.item,
});
export default connect (mapStateToProps,{ fetchComments, onDeleteComment, clearNewComment})(AllComments);
