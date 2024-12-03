import React from 'react'
import { useForm } from 'react-hook-form';

const RegisterBeatForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };


  return (
    <div className='max-w-3xl mx-auto pt-16 pb-8'>
      <div className='bg-[#0f0f0f] p-10 md:p-20 rounded-lg'>
        <h1 className='text-4xl font-bold text-white text-center'>Beat Information</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-8">
          {/* Full Name */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
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

          {/* Beat Name */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
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
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
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

          {/* Genre */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
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
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
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
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
              YouTube URL
            </label>
            <input
              type="url"
              placeholder="Enter the YouTube URL"
              {...register('youtubeUrl')}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>

          {/* Collaborators */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
              Name of Collaborators
            </label>
            <input
              type="text"
              placeholder="Enter the names of collaborators"
              {...register('collaborators')}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>

          {/* Are you the only producer? */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
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

          {/* Contains 3rd party samples */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
              This beat contains 3rd party samples
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
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('terms', { required: 'You must agree to continue' })}
                className="w-4 h-4 bg-[#1e2837] text-purple-600 rounded focus:ring-purple-600"
              />
              <span className="text-[#9da6be] text-sm">
                I agree to the terms and conditions
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-purple-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-purple-700 transition active:scale-95"
            >
              Register Beat
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterBeatForm