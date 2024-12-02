import React, { useState } from 'react'
import PlanBillsModal from './PlanBillsModal';

const PlansBills = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className=''>
      <div className='text-2xl font-bold my-4'>Beat Registration Plan</div>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-row gap-4 justify-between mt-2'>
          <div>
            <p className='text-[#80858f] text-lg'>Subscription</p>
            <h4 className='text-xl font-semibold mt-1'>Standard</h4>
            <p className='text-[#80858f]'>Renews on September 28th, 2024.</p>
          </div>
          <div className='flex flex-row gap-2 items-end'>
            <button className='p-3 bg-[#1e2837] text-xs xl:text-base text-white rounded hover:bg-gray-600'>Manage billing</button>
            <button className='p-3 bg-[#7837eb] text-xs xl:text-base text-white rounded hover:bg-[#804cd8]'>Update Plan</button>
          </div>
        </div>
        <div className=''>
          <p className='text-[#80858f] text-lg'>Beat Registration Credits</p>
          <h4 className='text-xl font-semibold mt-1'>20 monthly credits</h4>
          <p className='text-[#80858f]'>Your credits will reset to 20 in 19 days. on September 27th, 2024,</p>
        </div>
        <div className=''>
          <h4 className='text-xl font-semibold'>12 credits remaining</h4>
          <p className='text-[#80858f] mt-1'>You can register 12 more beats this month.</p>
        </div>
        <div className=''>
          <h5 className='text-[#80858f] text-lg font-bold'>Get Extra Credits</h5>
          <p className='text-[#80858f] mt-1'>Need more? Purchase additional credits to register more beats.</p>
          <button className='px-4 py-3 bg-[#7837eb] text-xs xl:text-base font-medium text-white rounded hover:bg-[#804cd8] mt-3' onClick={() => setShowModal(true)}>Buy Extra Credits</button>
        </div>
      </div>
      <PlanBillsModal setShowModal={setShowModal} showModal={showModal} />
    </div>
  )
}

export default PlansBills