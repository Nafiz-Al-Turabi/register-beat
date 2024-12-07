import React from 'react';
import { useForm } from 'react-hook-form';
const Profile = () => {
    
    const user = {
        name: "Usuario",
        email: "usuario@gmail.com",
        phone: "+1 (274) 855-3737",
    }

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: user
    });

    const onSubmit = (data) => {
        console.log('data', data)
    }

  return (
    <div className='max-w-3xl mx-auto pt-16 pb-8'>
      <div className='bg-[#0f0f0f] p-6 md:p-20 rounded-lg'>
        <h1 className='text-4xl font-bold text-[#b079e9] text-center'>Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-8">
          {/* Name */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: 'Email is required' })}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter the phone"
              {...register('phone')}
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>
          
          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-purple-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-purple-700 transition active:scale-95"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile