import React from 'react'

interface CustomImageUploadProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  images?: string[],
  isMultiple?: boolean
}

const CustomImageUpload: React.FC<CustomImageUploadProps> = ({ onChange, images, isMultiple }) => {
  return (
    <div>
      <label htmlFor="image" className='mb-2 text-black dark:text-gray-200'>Upload Image</label>
      <input type="file" accept='image/*' multiple={isMultiple} name="imageFile" id="imageFile" className='hidden' />
      <div className='w-full h-[300px] border-sky-500 border-2 border-dashed rounded-2xl bg-sky-100' id='imageFile'>
      </div>
    </div>
  )
}

export default CustomImageUpload