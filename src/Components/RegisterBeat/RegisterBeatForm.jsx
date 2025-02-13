import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import RegisterBeatPopup from './RegisterBeatPopup';
import CompletedPopup from './CompletedPopup';
import axiosInstance from '../../Axios/AxiosInstance';
import { AuthContext } from '../../Provider/AuthProvider';
import { trackEvent } from '../../facebookPixel/facebookPixel';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { toast } from 'react-hot-toast';

const RegisterBeatForm = ({ setRegisterData, formData }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();  
  const [showPopup, setShowPopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [showCompletedPopup, setShowCompletedPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  // Track event when button is clicked for meta pixel
  const handleButtonClick = () => {
    trackEvent("regiser-beat", { buttonName: "beat-register" });
  };

  const simulateProgress = async () => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const simulateApiCall = async (data) => {
    setProgress(0);
    setErrorMessage('');
    setShowPopup(true);  // Open modal when request starts

    try {
        // Start progress simulation
        await simulateProgress();

        // Creating FormData to include audio and image files
        const payload = new FormData();
        payload.append('fullName', data.fullName);
        payload.append('producer', data.producer);
        payload.append('beatName', data.beatName);
        payload.append('bpm', data.bpm);
        payload.append('genre', data.genre);
        payload.append('releaseDate', data.releaseDate);
        payload.append('youtubeUrl', data.youtubeUrl);

        payload.append('isOnlyProducer', data.isOnlyProducer);
        payload.append('collaborators', data.collaborators || '');
        payload.append('producerName', data.producerName || '');
        payload.append('percentage', data.percentage || '');
        payload.append('containsSamples', data.containsSamples);
        payload.append('terms', data.terms);

        // Ensure tags are sent as a stringified array
        const tagsArray = Array.isArray(tags) ? tags : [];
        payload.append('tags', JSON.stringify(tagsArray));

        if (formData.audio) {
            payload.append('audio', formData.audio);
        }
        if (formData.image) {
            payload.append('image', formData.image);
        }

        // Log the payload to verify tags are being sent correctly
        console.log('Tags being sent:', JSON.parse(payload.get('tags')));

        await axiosInstance.post(`/beat/create-beat/${user._id}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setProgress(100);
        return { success: true };
    } catch (error) {
        console.error('Error submitting form:', error);
        setProgress(0);
        toast.error('Failed to register. Please try again.');
        
        // Automatically close the modal if an error occurs
        setTimeout(() => {
            setShowPopup(false);
        }, 2000); 

        return { success: false };
    }
};


  const isOnlyProducer = watch('isOnlyProducer');  // Now watch is defined

  const onSubmit = async (data) => {
    // Check if audio and image files are selected
    if (!formData.audio) {
      toast.error('Please select an audio file');
      return;
    }

    if (!formData.image) {
      toast.error('Please select an image file');
      return;
    }

    setRegisterData(data);

    const response = await simulateApiCall(data);

    if (response.success) {
      setSuccess(true);
      setTimeout(() => {
        setShowPopup(false);
        setShowCompletedPopup(true);
      }, 2000);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto pt-16 pb-8'>
      <div className='bg-[#0f0f0f] p-2 md:p-20 rounded-lg'>
        <h1 className='text-4xl font-bold text-white text-center'>Beat Information</h1>        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-8">
          {/* Full Name */}
          <div>
            <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register('fullName', { required: 'Full Name is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Producer name*/}
          <div>
            <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
              Producer Name
            </label>
            <input
              type="text"
              placeholder="Enter your producer"
              {...register('producer', { required: 'Producer is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {errors.producer && (
              <p className="text-red-500 text-xs mt-1">{errors.producer.message}</p>
            )}
          </div>
          <div>
            <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
              Beat Name
            </label>
            <input
              type="text"
              placeholder="Enter your beat name"
              {...register('beatName', { required: 'Beat Name is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {errors.beatName && (
              <p className="text-red-500 text-xs mt-1">{errors.beatName.message}</p>
            )}
          </div>
          {/* BPM */}
          <div className=''>
            <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
              BPM
            </label>
            <input
              type="number"
              placeholder="Enter the BPM"
              {...register('bpm', { required: 'BPM is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {errors.bpm && (
              <p className="text-red-500 text-xs mt-1">{errors.bpm.message}</p>
            )}
          </div>

          {/* Tags */}
          <div className='col-span-2'>
            <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#7837eb] text-white px-2 py-1 rounded-md flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInput}
              placeholder="Add tags like genre, BPM, or anything to help you find it more easily later"
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            <p className="text-gray-400 text-xs mt-1">Type tag and press Enter or comma.</p>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
              Genre
            </label>
            <input
              type="text"
              placeholder="Enter the Genre"
              {...register('genre', { required: 'Genre is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {errors.genre && (
              <p className="text-red-500 text-xs mt-1">{errors.genre.message}</p>
            )}
          </div>

          {/* Date of Release */}
          <div>
            <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
              Date of Release
            </label>
            <input
              type="date"
              {...register('releaseDate', { required: 'Release Date is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {errors.releaseDate && (
              <p className="text-red-500 text-xs mt-1">{errors.releaseDate.message}</p>
            )}
          </div>

          {/* YouTube URL */}
          <div>
            <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
              YouTube URL
            </label>
            <input
              type="url"
              placeholder="Enter the YouTube URL"
              {...register('youtubeUrl')}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>

          {/* Are you the only producer? */}
          <div>
            <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
              Are you the only producer on this beat?
            </label>
            <select
              {...register('isOnlyProducer', { required: 'This field is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.isOnlyProducer && (
              <p className="text-red-500 text-xs mt-1">
                {errors.isOnlyProducer.message}
              </p>
            )}
          </div>

          {isOnlyProducer === 'no' && (
            <>
              {/* Collaborators */}
              <div>
                <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
                  Name of Collaborators
                </label>
                <input
                  type="text"
                  placeholder="Enter the names of collaborators"
                  {...register('collaborators')}
                  className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              {/* Producer name of Collaborators */}
              <div>
                <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
                  Producer name of Collaborators
                </label>
                <input
                  type="text"
                  placeholder="Enter the producer name"
                  {...register('producerName')}
                  className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              {/* Collab percentage (%) Of other producer */}
              <div>
                <label className="block text-[#e3e6ed] text-sm font-medium mb-2">
                  Collab percentage (%) Of other producer
                </label>
                <input
                  type="number"
                  placeholder="Enter the percentage"
                  {...register('percentage')}
                  className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>
            </>
          )}

          {/* Contains 3rd party samples */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer text-[#e3e6ed] text-sm font-medium mb-2 group">
              This beat contains 3rd party samples
              <span className="relative">
                <IoMdInformationCircleOutline />
                <span className="absolute w-72 hidden bg-gray-800 text-white text-xs rounded-md p-2 bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:block">
                  Third-party sarrvles are any audio dements
                  you create yourself, including:
                  <ul className='list-disc pl-5 my-3'>
                    <li>
                      Samples from platforms like Splice, Loopmasters, Cymatics, Tracklib, LANDR, samples etc.
                    </li>
                    <li>
                      Snippets from other songs.
                    </li>
                    <li>
                      Any externany source audio.
                    </li>
                  </ul>
                  <div>
                    <h1 className='text-sm font-semibold mb-2'>Why is this important?</h1>
                    <p>
                      If your beat contains third-party samples, it's
                      essential to disclose it. This doesn't mean you
                      can't use them, but you must follow their
                      licensing terms.

                    </p>
                    <h1 className='text-sm font-semibold mb-2'>Can I Register a Beat With Third-Party Samples ?</h1>
                    <p>
                      Yes. but make sure you with the

                      license agreements. Platforms like Splice allow unrestricted use. while may require additional permissims. If the sample comes from a copyrighted song. you may need clearance to avoid legal issues.
                    </p>
                  </div>
                </span>

              </span>



            </label>


            <select
              {...register('containsSamples', { required: 'This field is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.containsSamples && (
              <p className="text-red-500 text-xs mt-1">
                {errors.containsSamples.message}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="col-span-2">
            <label className="flex  space-x-2">
              <input
                type="checkbox"
                {...register('terms', { required: 'You must agree to continue' })}
                className="w-6 h-6  bg-[#1e2837] text-purple-600 rounded focus:ring-purple-600"
              />
              <span className="text-[#e3e6ed] text-sm">
                I confirm that I am the rightful owner of this beat and have all necessary rights to register it. I acknowledge that BeatProtect is not responsible for any disputes or legal claims arising from the registration of this beat. By proceeding, I also agree to BeatProtect’s Terms and Conditions
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
            )}
          </div>

          <div className='w-full flex justify-center col-span-2'>
            <button
              type="submit"
              onClick={handleButtonClick}
              className="bg-[#7837eb]  text-white py-3 px-8 rounded-md mt-8 hover:bg-[#5a2ca3] transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {showPopup && (
        <RegisterBeatPopup
          progress={progress}
          success={success}
          setShowPopup={setShowPopup}
        />
      )}

      {showCompletedPopup && (
        <CompletedPopup setShowCompletedPopup={setShowCompletedPopup} />
      )}
    </div>
  );
};

export default RegisterBeatForm;
