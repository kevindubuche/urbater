import React, {Component,Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import AddAnnonce from './AddAnnonce';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAnnonces } from '../../../actions/annonceActions';
import { onDelete } from '../../../actions/annonceActions';
import { clearNewAnnonce } from '../../../actions/annonceActions';


import Form from './Form';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class  Annonces extends Component {
    constructor(props){
        super(props);
        this.state={
           openAlert :false,
           idArtDelete :'',
           confirmDelete:false,
           localArticle: {
               id :'',
               title : '',
               body:'',
               author : '',
               source : '',
               created_at: '',
               updated_at : ''
               
           }
       }
  
   }
UNSAFE_componentWillMount(){
   this.props.fetchAnnonces();
}
UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.newAnnonce){
    
         if(nextProps.newAnnonce.id )//on verifie si y a un nouveau article pour afficher un alert
       {
        this.props.annonces.unshift(nextProps.newAnnonce); //on ajoute le nouveau article en tete de liste
           console.log('New article added successfully !');
           console.log(nextProps.newAnnonce);
        this.setState({
            openAlert :true
        })
        this.props.clearNewAnnonce();
       } 
    
    }
  
}
onSelectArticle = id =>{
    this.setState({
        localArticle : this.props.annonces.find(article => article.id === id),
        editMode : false
    })
    // console.log('qqqqqqqqq: '+this.props.file_directory+"/"+this.state.localArticle.image)
}

  handleCloseAlert = () => {
    this.setState({
        openAlert :false
    })
    }

    confirmDelete = (id) => {
        this.setState({
            confirmDelete :true,
            idArtDelete : id
        })
        
        }
        agreeDeleteDialog = ()=> {
            this.props.onDelete(this.state.idArtDelete);
            this.setState({
                confirmDelete :false,
                openAlert :true,
                editMode : this.state.localArticle.id===this.state.idArtDelete ? false : this.state.editMode,
                localArticle : this.state.localArticle.id===this.state.idArtDelete ? {
                    
               title : 'Bienvenue !',
               body:'Selectionnez un article dans la liste ci-contre.'
                } : this.state.localArticle
            })
        }

        handleCloseDeleteDialog=()=>{
            this.setState({
                confirmDelete :false
            })
        }
        onSelectEdit = id =>{
            this.setState({
                localArticle : this.props.annonces.find(article => article.id === id),
                editMode : true
            })
           
        }
        openAlert = () => {
            this.setState({
                openAlert : true
                
            })
        }
       
    render(){
        const {openAlert} = this.state
        const styles ={
            Paper : {
                padding :20,
                  marginTop : 10,
                  marginBottom: 10,
                   height:500,
                   overflowY:'auto'}
        }
         return(
            <div >
            {/* <NavAdm /> */}
           
            <Grid container>
                <Grid item xm= {12} sm={12} md={4} >  <Paper style={styles.Paper} >
                        {this.props.annonces.map(( blog, index) => 
                        <Fragment key={index}>
                            <Typography 
                                variant="h6"
                                style={{ textTransform:'capitalize' }}
                                
                                onClick={()=> this.onSelectArticle(blog.id)} >
                                {blog.title}
                        </Typography>
                        <List component="ul">
                            <ListItem button
                            onClick={()=> this.onSelectArticle(blog.id)}
                            >
                            <ListItemText 
                            primary={blog.created_at} 
                            />
                            <ListItemSecondaryAction>
                                    <IconButton onClick ={()=>this.confirmDelete(blog.id)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton onClick ={()=>this.onSelectEdit(blog.id)}>
                                        <Edit />
                                    </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>
                            
                        </List>
                        </Fragment>
                        
                        )}
                    
                        </Paper>
                </Grid>
                <Grid item xm= {12} sm={12} md={8} >
                <Paper style={styles.Paper}>
                    <AddAnnonce />
                    {this.state.editMode ?
                    <Form article= {this.state.localArticle} openAlert={this.openAlert} />
                    : <Fragment>
                        <Typography
                            variant="h3" 
                            >
                               {this.state.localArticle.title}
                            </Typography >
                            
                            {this.state.localArticle.id ?
                         <img src={"/annonces_images/"+this.state.localArticle.image} width={200} height={200} />
                         : '' }
                        
                            <Typography
                           variant="caption" display="block" gutterBottom style={{ color:"#8c8c8c"}}
                            >
                         {this.state.localArticle.author}
                            </Typography >
                            <Typography
                            variant="caption" display="block" gutterBottom style={{ color:"#8c8c8c"}}
                            >
                            {this.state.localArticle.source}
                            </Typography >
                            <Typography
                           variant="caption" display="block" gutterBottom style={{ color:"#8c8c8c"}}
                            >
                        {this.state.localArticle.created_at}
                            </Typography >
                            <br />
                            <Typography
                            variant="h6"
                            >               
                            <Fragment>
                             <div className="content" dangerouslySetInnerHTML={{__html:this.state.localArticle.body} }></div>   
                            </Fragment>       
                                
                           
                         </Typography>
                        
                    </Fragment>
                    }
                   
                            
                </Paper>
                </Grid>
            </Grid>
          
            {/* <ImageUpload /> */}
           

            {/* cette partie concerne l'alerte de success
             */}
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={this.handleCloseAlert}>
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
                <DialogTitle id="alert-dialog-slide-title">{"Confirmer la suppression de cet article"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Confirmer la suppression. ATTENTION !!! Cette operation est irresersible.
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

        
        </div>
    )}
}

Annonces.propTypes = {
    fetchAnnonces : PropTypes.func.isRequired,
    annonces : PropTypes.array.isRequired,
    newAnnonce : PropTypes.object,
    onDelete : PropTypes.func.isRequired,
    clearNewAnnonce : PropTypes.func.isRequired,

}
const mapStateToProps =(state) => ({
        annonces : state.annonces.items,
        newAnnonce : state.annonces.item,
      
});

export default connect(mapStateToProps,{ fetchAnnonces, clearNewAnnonce, onDelete })(Annonces)
