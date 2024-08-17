import _ from "lodash";
import Dropzone, { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from 'react'
import RemoveSvg from "../globel-components/remove-svg";


function ImageUpload() {

  const [uploadedImage, setuploadedImage] = useState([]);
  const [changeClass,setChangeClass] = useState(false);

  const onDrop = useCallback((acceptedFiles,rejectedFiles) => {
  
  //  console.log(acceptFiles.map(file =>file.name));
  //   const allImages = [...acceptFiles, ...uploadedImage.images];
  //   const imageNames = new Set(
  //     uploadedImage.map((img) => img.name.toLowerCase())
  //   );

  //   const newFiles = allImages.filter((file) => {
      
  //     const normalizedName = file.name.toLowerCase();
  //     if (imageNames.has(normalizedName)) {
  //       return false;
  //     } else {
  //       imageNames.add(normalizedName);               
  //       return true;
  //     }
  //   })
  
  console.log(acceptedFiles);
  if (acceptedFiles?.length) {

    if(acceptedFiles?.length===1){
      setuploadedImage(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ]);
    }

    setChangeClass(true);
  }

  console.log(acceptedFiles.length);
    
  },[])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    
    onDrop,
  });

  useEffect(() => {
    return () => {
      uploadedImage?.forEach((file) => URL.revokeObjectURL(file.preview));
    }
  }, [uploadedImage]);

  const removeFile = (name) => {
    // setuploadedImage((prev) => {
    //   const newImages = prev.images.filter((file) => file.name !== name);
    //   if (newImages.length <= 8 && errors.images) {
    //     setErrors((prev) => ({ ...prev, images: nulls }))
    //   }
    //   return {
    //     ...prev,
    //     images: newImages,
    //   };
    // });
    setuploadedImage((prev) => prev.filter((file) => file.name !== name),setChangeClass(false));
  }






  return (
    <React.Fragment>
      <form action="">
    <section className="image-upload-section">
      <span>Add an image</span>
      <label {...getRootProps()} for="myFileInput">
      <input {...getInputProps()}/>
        <div>
          <svg class="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>

      </label>
      {/* <input  type="file" id="myFileInput" accept="image/*" /> */}
    </section>
    <section className={changeClass ? "view-image" : "view-imageOn"}>
    {uploadedImage.map(file=>(
      <>
      <RemoveSvg onRemove={()=>removeFile(file.name)}/>
    {/* <button type="submit">Submit</button> */}
      <img key={file.name} className="detecting-image" src={file.preview} alt={file.name} onLoad={() => {
        URL.revokeObjectURL(file.preview);
      } } /></>
    ))}
    </section>
    </form>
    </React.Fragment>
  )
}

export default ImageUpload;
