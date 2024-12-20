'use client'

import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { uploadImage } from '../app/api/mockApi'

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void
  currentImage?: string
}

export default function ImageUploader({ onImageUpload, currentImage }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 创建本地预览
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
  
      try {
        // 调用真实的上传接口
        const uploadedImageUrl = await uploadImage(file);
        onImageUpload(uploadedImageUrl); // 将后端返回的图片 URL 传递给父组件
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again1.');
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center">
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover mb-4" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
          <Upload size={32} className="text-gray-400" />
        </div>
      )}
      <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
        上传图片
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
    </div>
  )
}

