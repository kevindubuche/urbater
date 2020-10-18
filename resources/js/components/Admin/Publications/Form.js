import React, { Component} from 'react';
import TextField from '@material-ui/core/TextField';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import { createOrEditPublication } from '../../../actions/publicationActions';

import { withStyles } from '@material-ui/styles';
import CropImage from './CropImage';


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
                   document: '',
                //    token : localStorage.getItem('user')
               },
               imagePreviewUrl:'',
               ///////////
               userProfilePic:'',
              editor:null,
              scaleValue:1,
            
           }
           this.handleInputChange = this.handleInputChange.bind(this);

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
            document: '',
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
    const data = new FormData() 
    
    data.append('title', this.state.localArticle.title);
    data.append('body', this.state.localArticle.body);
    data.append('author',this.state.localArticle.author);
    data.append('source',this.state.localArticle.source);
    data.append('resume', this.state.localArticle.resume);
    data.append('document',this.state.localArticle.document);
    data.append('keyWords', this.state.localArticle.keyWords);
    data.append('image',this.state.localArticle.image);
    data.append('token',localStorage.getItem('user'));
    this.state.localArticle.id ? data.append('id', parseInt(this.state.localArticle.id)) : '';
    this.state.localArticle.id ? data.append("_method", "put"): '';
    this.props.createOrEditPublication(data);
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
        //////////
        // this.fileTransform(fileChangeEvent);
        //  this.onCrop()
        this.setState({
            imagePreviewUrl: file
          });
        this.onCrop();
    }

    
}
handleInputChange(event) {
    this.setState({
        localArticle :{
            ...this.state.localArticle,
            document: event.target.files[0],
        }
        
      });
}
onCrop =(e) =>{
    const {editor} = this.state;
    if(editor != null){
        console.log('okkkkkkk')
        const url = editor.getImageScaledToCanvas().toDataURL();
        this.setState({userProfilePic : url});
        console.log('men li : '+url);
        //nou fin crop li now nap transform li en base64
        // this.state.localArticle.image =base64String;
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
                {/* <input type="file" id="image" onChange={this.fileTransform} /> */}
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={this.profileImageChange} 
                    // onClick={this.profileImageChange} 
                    />

                <br /> 
                {  imagePreviewUrl ?//nap verifier si se new or edit
                   
                    //  (<img src={imagePreviewUrl} width='200px' height='200px'/>)
                    <CropImage
                     imageSrc={imagePreviewUrl}
                     setEditorRef={this.setEditorRef}
                      onCrop={this.onCrop}
                     scaleValue={this.state.scaleValue}
                     onScaleChange={this.onScaleChange}
                    //  onImageChange={console.log('anmweeeeey')}
                    //  onChange={console.log('onchange')}
                     /> 
                    :  this.props.article ?
                    //  <img src={"/annonces_images/"+this.state.localArticle.image} width={200} height={200} /> 
                    <CropImage
                    imageSrc={"/publications_images/"+this.state.localArticle.image}
                    setEditorRef={this.setEditorRef}
                     onCrop={this.onCrop}
                    scaleValue={this.state.scaleValue}
                    onScaleChange={this.onScaleChange}
                    // onImageChange={console.log('anmweeeeey')}
                    // onChange={console.log('onchange')}
                    />
                        : <div></div>
                } 

           {/* <input
            type="file"
             accept="image/png, image/jpeg, image/jpg"
              onChange={this.profileImageChange} /> */}
                <br /><br />
                {/* <CropImage
                imageSrc={this.state.selectedImage}
                setEditorRef={this.setEditorRef}
                 onCrop={this.onCrop}
                scaleValue={this.state.scaleValue}
                onScaleChange={this.onScaleChange}
                /> */}
                <br />
                <div style={{}}>
                    
                <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.localArticle.body}
                    //"<p>Ajoutez votre texte ici !</p>"
                    config={{ckfinder: {
                        // Upload the images to the server using the CKFinder QuickUpload command.
                        uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
                        
                    }
                }}
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
                </div >
               
                <br />
                <br /> 
                <h6>Document</h6>
                
                <input type="file" 
                className="form-control"
                 name="upload_file"
                  onChange={this.handleInputChange}
                  required />
  

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
    createOrEditPublication : PropTypes.func.isRequired
}
export default connect(null, { createOrEditPublication })(withStyles (styles) (Form) )