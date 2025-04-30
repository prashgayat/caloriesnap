import React, { useRef, useState } from 'react';
import { Camera, Upload, ImageIcon } from 'lucide-react';

interface CaptureSectionProps {
  onImageSelect: (imageDataUrl: string) => void;
}

const CaptureSection: React.FC<CaptureSectionProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.setAttribute('accept', 'image/*');
      fileInputRef.current.click();
    }
  };
  
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.setAttribute('accept', '.jpg,.jpeg,.png');
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  
  const processFile = (file: File) => {
    // Check file size (max ~8MB)
    if (file.size > 8 * 1024 * 1024) {
      alert('Please select an image under 8MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelect(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        processFile(file);
      } else {
        alert('Please drop an image file.');
      }
    }
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Capture Food Image</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleCameraCapture}
          className="flex flex-col items-center justify-center gap-3 p-8 bg-white rounded-xl shadow-sm hover:shadow-md border-2 border-transparent hover:border-green-500 transition-all duration-200"
        >
          <Camera size={48} className="text-green-500" />
          <span className="font-medium">Take a Photo</span>
        </button>
        
        <button
          onClick={handleFileUpload}
          className="flex flex-col items-center justify-center gap-3 p-8 bg-white rounded-xl shadow-sm hover:shadow-md border-2 border-transparent hover:border-green-500 transition-all duration-200"
        >
          <Upload size={48} className="text-green-500" />
          <span className="font-medium">Upload from Device</span>
        </button>
      </div>
      
      <div
        className={`hidden md:flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl ${
          isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'
        } transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <ImageIcon size={32} className="text-gray-400 mb-3" />
        <p className="text-gray-500">Drag & drop an image here</p>
        <p className="text-gray-400 text-sm mt-1">JPEG, PNG (max 8MB)</p>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default CaptureSection;