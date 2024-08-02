import _ from "lodash";
import Dropzone, { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from 'react'
import RemoveSvg from "../globel-components/remove-svg";


function ImageUpload() {

  const [uploadedImages, setUploadedImages] = useState();

  const onDrop = (acceptFiles) => {
    const allImages = [...acceptFiles, ...uploadedImages];
    const imageNames = new Set(
      uploadedImages.map((img) => img.name.tolowerCase())
    );

    const newFiles = allImages.filter((file) => {
      const normalizedName = file.name.toLowerCase();
      if (imageNames.has(normalizedName)) {
        return false;
      } else {
        imageNames.add(normalizedName);
        return true;
      }
    })

    newFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));

    if (newFiles?.length) {
      setUploadedImages((prevFiles) => ({
        ...prevFiles,
        images: [...prevFiles.images, ...newFiles],
      }));
    }
  }

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    return () => {
      uploadedImages?.forEach((file) => URL.revokeObjectURL(file.preview));
    }
  }, [uploadedImages]);

  const removeFile = (name) => {
    setUploadedImages((prev) => {
      const newImages = prev.images.filter((file) => file.name !== name);
      // if (newImages.length <= 8 && errors.images) {
      //   setErrors((prev) => ({ ...prev, images: nulls }))
      // }
      return {
        ...prev,
        images: newImages,
      };
    });


  }

  return (
    <React.Fragment>
    <section className="image-upload-section">
      <span>Add an image</span>
      <label for="myFileInput">
        <div>
          <svg class="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>

      </label>
      <input type="file" id="myFileInput" accept="image/*" />
    </section>
    <section className="view-image w-full ">
      <RemoveSvg/>
    <img src="https://images.pexels.com/photos/220769/pexels-photo-220769.jpeg?cs=srgb&dl=pexels-pixabay-220769.jpg&fm=jpg" alt="" />
    </section>
    </React.Fragment>
  )
}

export default ImageUpload;
