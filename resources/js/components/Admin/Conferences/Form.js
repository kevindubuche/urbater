import React, { Component} from 'react';
import TextField from '@material-ui/core/TextField';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import { createOrEditConference } from '../../../actions/conferenceActions';

import { withStyles } from '@material-ui/styles';
import CropImage from '../Annonces/CropImage';


const styles = theme =>({
    FormControl :{
        width :500
    }
})
 class Form extends Component{
    constructor(props){
        super(props);
        this.state= {
            localArticle :{
                   title : '',
                   body:'',
                   author : '',
                   source : '',
                   image :'',
                   keyWords:'',
                   created_at: '',
                   updated_at : '',
                //    token : localStorage.getItem('user')
               },
               imagePreviewUrl:'',
               ///////////
               userProfilePic:'',
              editor:null,
              scaleValue:1,
            
           }
   }
   componentDidMount(){
    this.setState({
        localArticle :this.props.article ? this.props.article :{
            title : '',
            body:'',
            author : '',
            source : '',
            resume :'',
            image: '',
            keyWords:'',
            created_at: '',
            updated_at : '',
            // token : localStorage.getItem('user')
     },
     imagePreviewUrl:''
    })

   }
   UNSAFE_componentWillReceiveProps({article}){//nou pa use redux la donc nap veye changement de article selectionner
       console.log('ou resevwa props')
       this.setState({
           localArticle : article
       })

   }

   handleSubmit= e =>{
    // TODO : validate
    e.preventDefault();
    this.onCrop();
    this.props.createOrEditConference(this.state.localArticle);
    //si c'est SAVE on ferme le modal & si EDIT on affiche succes
    !this.state.localArticle.id ? this.props.closeModal() :this.props.openAlert();
   
    
}

   handleChange = name => ({target: {value}}) => {
    this.setState({
        localArticle :{
            ...this.state.localArticle,
            [name]:value
        }
    })
}
getBase64 = (file,callback) => {
    const reader = new FileReader();
    reader.addEventListener('load',()=>callback(reader.result));
    reader.readAsDataURL(file);

    //po preview image la
    reader.onloadend = () => {
    this.setState({
        imagePreviewUrl: reader.result
      });
    }
}
fileTransform = (e) =>{
    this.getBase64(e.target.files[0], (base64String)=>{
        this.state.localArticle.image =base64String;
        console.log(this.state.localArticle)
    })
}
setEditorRef = editor => this.setState({editor});

profileImageChange = (fileChangeEvent) =>{
    const file = fileChangeEvent.target.files[0];
    const {type} = file;
  
      if(type.endsWith('jpg') || type.endsWith('jpeg') || type.endsWith('png')){
        this.setState({selectedImage : file})
      this.setState({
            imagePreviewUrl: file
          });
        this.onCrop();
    }

    
}

onCrop =(e) =>{
    const {editor} = this.state;
    if(editor != null){
        console.log('okkkkkkk')
        const url = editor.getImageScaledToCanvas().toDataURL();
        this.setState({userProfilePic : url});
        console.log('men li : '+url);
       this.state.localArticle.image =url;
      
    }
}

onScaleChange = (scaleValueEvent) =>{
    const scaleValue = parseFloat(scaleValueEvent.target.value);
    this.setState({ scaleValue});
    console.log('wap chanje size')
}
    render(){
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
    
        return(
            <form onSubmit={this.handleSubmit}>
            <TextField
                label="Title"
                onChange={this.handleChange('title')}
                value={this.state.localArticle.title}
                margin="normal"
                className={this.props.classes.FormControl}
                required
                /> 
                <br />
                    <TextField
                label="Auteur"
                onChange={this.handleChange('author')}
                value={this.state.localArticle.author}
                margin="normal"
                className={this.props.classes.FormControl}
                required
                /> 
                <br />
                    <TextField
                label="Source"
                onChange={this.handleChange('source')}
                value={this.state.localArticle.source}
                margin="normal"
                className={this.props.classes.FormControl}
                required
                /> 
                <br />
                <br />
                    <TextField
                label="Resume"
                onChange={this.handleChange('resume')}
                value={this.state.localArticle.resume}
                margin="normal"
                multiline
                rows="4"
                className={this.props.classes.FormControl}
                required
                /> 
                <br />
                <TextField
                label="KeyWords"
                onChange={this.handleChange('keyWords')}
                value={this.state.localArticle.keyWords}
                margin="normal"
                multiline
                rows="4"
                className={this.props.classes.FormControl}
                /> 
              <h6>Image</h6>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={this.profileImageChange} 
                    />

                <br /> 
                {  imagePreviewUrl ?//nap verifier si se new or edit
                   
                  <CropImage
                     imageSrc={imagePreviewUrl}
                     setEditorRef={this.setEditorRef}
                      onCrop={this.onCrop}
                     scaleValue={this.state.scaleValue}
                     onScaleChange={this.onScaleChange}
                   /> 
                    :  this.props.article ?
                   <CropImage
                    imageSrc={"/conferences_images/"+this.state.localArticle.image}
                    setEditorRef={this.setEditorRef}
                     onCrop={this.onCrop}
                    scaleValue={this.state.scaleValue}
                    onScaleChange={this.onScaleChange}
                    />
                        : <div></div>
                } 
                <br />

                <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.localArticle.body}
                    //"<p>Ajoutez votre texte ici !</p>"
                    config={{ckfinder: {
                        // Upload the images to the server using the CKFinder QuickUpload command.
                        uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
                    }}}
                    onInit={ (editor,body=this.state.localArticle.body) => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                        editor.data.set(body);
                    } }
                    
                    onChange={ ( event, editor ) => {
                        // this.handleCKChange(editor);
                        const data = editor.getData();
                        this.setState({
                            localArticle :{
                                ...this.state.localArticle,
                                body:data
                            }
})
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                    
                />
               
                <br />
             
                <Button
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    >
                   {this.props.article ? 'Edit' : 'Enregistrer'}
                    
                </Button>
                
                  
            </form>
        )
    }
}
Form.propTypes = {
    createOrEditConference : PropTypes.func.isRequired
}
export default connect(null, { createOrEditConference })(withStyles (styles) (Form) )