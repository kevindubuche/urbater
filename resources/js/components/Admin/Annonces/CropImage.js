import React from 'react';
import AvatarEditor from 'react-avatar-editor';

const ImageCrop = ({imageSrc,
     onCrop, 
     setEditorRef,
      scaleValue,
       onScaleChange,
       onImageReady})=>(
    <div>
        <AvatarEditor
         image={imageSrc}
          border={0}
          width={300}
          height={300}
           scale={scaleValue} 
           ref={setEditorRef} 
           onImageReady={onImageReady}
           color={[255,255,255, 0.6]}
           />
           <input 
           style={{width:"80%"}}
            type="range"
             value={scaleValue} 
             min="1" 
             max="50"
             step="1/10"
           onChange={onScaleChange}
          
            />
            <br />
           <a  onClick={onCrop}>Crop it</a>
    </div>
);
export default ImageCrop;