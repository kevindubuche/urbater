import React, { Component} from 'react';
import TextField from '@material-ui/core/TextField';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import { createOrEditDocArchimo } from '../../../actions/docArchimoActions';

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
                   id:null,
                   title : '',
                   resume:'',
                   image :'',
                   document: '',
                   formData:'',
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
           this.handleInputChange = this.handleInputChange.bind(this);

   }
   componentDidMount(){
    this.setState({
        localArticle :this.props.article ? this.props.article :{
            id:null,
            title : '',
            resume:'',
            image: '',
            document: '',
            formData:'',
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
    //transfomer document an
    const data = new FormData() 
    
    data.append('title', this.state.localArticle.title);
    data.append('resume', this.state.localArticle.resume);
    data.append('document',this.state.localArticle.document);
    data.append('image',this.state.localArticle.image);
    data.append('token',localStorage.getItem('user'));
    this.state.localArticle.id ? data.append('id', parseInt(this.state.localArticle.id)) : '';
    this.state.localArticle.id ? data.append("_method", "put"): '';
    // console.warn(this.state.finame);
    
    // console.log('------------------',data);
     this.props.createOrEditDocArchimo(data);
    // //si c'est SAVE on ferme le modal & si EDIT on affiche succes
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
handleInputChange(event) {
    this.setState({
        localArticle :{
            ...this.state.localArticle,
            document: event.target.files[0],
        }
        
      });
    //   const upload_file = event.target.files[0];
    //   const formData = new FormData();
    //   formData.append('document', upload_file);
    //   this.setState({
    //     localArticle :{
    //         ...this.state.localArticle,
    //         formData: formData,
    //     }
        
    //   });
    //   console.log(upload_file);
    //   console.log(formData);
}

// onChange= (e) =>{
//     let files = e.target.files;
//     let reader = new FileReader();
//     reader.readAsDataURL(files[0]);
//     reader.onload=(e)=>{
//         const formData ={file: e.target.result}
//         this.state.localArticle.filename = formData;
//         }
         
//     }


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
                <br />
                    <TextField
                label="Resume"
                onChange={this.handleChange('resume')}
                value={this.state.localArticle.resume}
                margin="normal"
                multiline
                rows="5"
                className={this.props.classes.FormControl}
                required
                /> 
                <br />
     
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
                    imageSrc={"/docarchimos_images/"+this.state.localArticle.image}
                    setEditorRef={this.setEditorRef}
                     onCrop={this.onCrop}
                    scaleValue={this.state.scaleValue}
                    onScaleChange={this.onScaleChange}
                    />
                        : <div></div>
                } 
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
    createOrEditDocArchimo : PropTypes.func.isRequired
}
export default connect(null, { createOrEditDocArchimo })(withStyles (styles) (Form) )