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

import AddKonbit from './AddKonbit';

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
import { fetchKonbits } from '../../../actions/konbitActions';
import { onDelete } from '../../../actions/konbitActions';
import { clearNewKonbit } from '../../../actions/konbitActions';


import Form from './Form';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class  Konbits extends Component {
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
   this.props.fetchKonbits();
}
UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.clearNewKonbit){
    
         if(nextProps.newKonbit.id )//on verifie si y a un nouveau article pour afficher un alert
       {
        this.props.konbits.unshift(nextProps.newKonbit); //on ajoute le nouveau article en tete de liste
           console.log('New konbit added successfully !');
           console.log(nextProps.newKonbit);
        this.setState({
            openAlert :true
        })
        this.props.clearNewKonbit();
       } 
    
    }
  
}
onSelectArticle = id =>{
    this.setState({
        localArticle : this.props.konbits.find(article => article.id === id),
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
                localArticle : this.props.konbits.find(article => article.id === id),
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
                        {this.props.konbits.map(( blog, index) => 
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
                    <AddKonbit />
                    {this.state.editMode ?
                    <Form article= {this.state.localArticle} openAlert={this.openAlert} />
                    : <Fragment>
                        <Typography
                            variant="h3"
                            >
                               {this.state.localArticle.title}
                            </Typography >

                            {this.state.localArticle.id ?
                         <img src={"/konbits_images/"+this.state.localArticle.image} width={200} height={200} />
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

Konbits.propTypes = {
    fetchKonbits : PropTypes.func.isRequired,
    konbit : PropTypes.array.isRequired,
    newKonbit : PropTypes.object,
    onDelete : PropTypes.func.isRequired,
    clearNewKonbit : PropTypes.func.isRequired,

}
const mapStateToProps =(state) => ({
        konbits : state.konbits.items,
        newKonbit : state.konbits.item,
      
});

export default connect(mapStateToProps,{ fetchKonbits, clearNewKonbit, onDelete })(Konbits)
