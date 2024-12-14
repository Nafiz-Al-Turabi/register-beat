import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import RegisterBeatForm from '../Components/RegisterBeat/RegisterBeatForm';
import { LuMusic } from 'react-icons/lu';

const RegisterBeat = () => {
  const [registerData, setRegisterData] = useState();
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState({ audio: false, image: false });

  const data = {
    registerData: registerData,
    audio: audio,
    image: image,
    }

  console.log('data', data)

  const onAudioDrop = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setAudio(acceptedFiles[0]);
      console.log('Audio File:', acceptedFiles[0]);
    }
    setIsDragging({ ...isDragging, audio: false });
  };

  const onImageDrop = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setImage(acceptedFiles[0]);
      const mediaUrl = URL.createObjectURL(acceptedFiles[0]);
      setPreviewImage(mediaUrl);
      console.log('Image File:', acceptedFiles[0]);
    }
    setIsDragging({ ...isDragging, image: false });
  };

  const audioDropzone = useDropzone({
    onDrop: onAudioDrop,
    accept: { 'audio/*': ['.mp3', '.wav'] },
    multiple: false,
    onDragEnter: () => setIsDragging({ ...isDragging, audio: true }),
    onDragLeave: () => setIsDragging({ ...isDragging, audio: false }),
  });

  const imageDropzone = useDropzone({
    onDrop: onImageDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false,
    onDragEnter: () => setIsDragging({ ...isDragging, image: true }),
    onDragLeave: () => setIsDragging({ ...isDragging, image: false }),
  });

  return (
    <div className="flex flex-col p-1 lg:p-4 animate-from-middle max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-[#b079e9] text-center mb-8">Register a New Beat</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Beat File Upload */}
        <div className="w-full lg:w-1/2 max-h-fit bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#5fa5fa] mb-4">Upload Your Beat</h2>
          <div
            {...audioDropzone.getRootProps()}
            className={`border-2 border-dashed flex flex-col items-center rounded py-8 cursor-pointer transition ${
              isDragging.audio ? 'bg-purple-900/50 border-purple-600' : 'border-purple-500'
            }`}
          >
            <input {...audioDropzone.getInputProps()} />
            <p className="py-3 px-5 bg-purple-600 text-sm md:text-base text-white font-semibold rounded-full hover:bg-purple-500 transition">
              Select or Drop Beat File
            </p>
            <p className="mt-4 text-sm md:text-base text-gray-400 text-center">or drag and drop your beat file here</p>
             {audio && <p className='flex justify-between items-center gap-2 text-lg text-[#c6b3ec] mt-3'><LuMusic className='font-bold' /> {audio.name}</p>}
          </div>
        </div>

        {/* Beat Image Upload */}
        <div className="w-full lg:w-1/2 max-h-fit bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#5fa5fa] mb-4">Upload Beat Image</h2>
          <div
            {...imageDropzone.getRootProps()}
            className={`border-2 border-dashed flex flex-col items-center rounded py-8 cursor-pointer transition ${
              isDragging.image ? 'bg-purple-900/50 border-purple-600' : 'border-purple-500'
            }`}
          >
            <input {...imageDropzone.getInputProps()} />
            <p className="py-3 px-5 bg-purple-600 text-sm md:text-base text-white font-semibold rounded-full hover:bg-purple-500 transition">
              Select or Drop Image File
            </p>
            <p className="mt-4 text-sm md:text-base text-gray-400 text-center">or drag and drop your image file here</p>
            {previewImage && <img src={previewImage} alt="" className='w-36 h-36 mt-4 object-cover rounded-lg' /> }
          </div>
        </div>
      </div>
      <div className=''>
        <RegisterBeatForm setRegisterData={setRegisterData} formData={data} />
      </div>
    </div>
  );
};

export default RegisterBeat;
