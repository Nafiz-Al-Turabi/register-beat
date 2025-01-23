import React, { useContext, useState } from 'react'
import PlanBillsModal from './PlanBillsModal';
import ManangeSubsPopup from '../ManageSubscription/ManangeSubsPopup';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../Axios/AxiosInstance';

const PlansBills = () => {
  const [showModal, setShowModal] = useState(false);
  const [managePopup, setManagePopup] = useState(false);
  const { user } = useContext(AuthContext);

  const handleCancelClick = async () => {
    if (!user?._id) {
        toast.error("User not found");
        return;
    }

    setIsLoading(true);
    try {
       const  response = await axiosInstance.delete(`/payments/cancelSubscription/${user._id}`);
        console.log(response.data)
        toast.success('Subscription cancelled successfully');
        setShowPopup(false);
    } catch (error) {
        console.error("Error while cancelling: ", error.message);
        toast.error('Failed to cancel subscription. Please try again.');
    } finally {
        setIsLoading(false);
    }
};

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
            {
              user?.active === true || 
              new Date(user?.subscriptionEndDAte) > new Date() ? <button className='p-3 bg-[#7837eb] text-xs xl:text-base text-white rounded hover:bg-[#804cd8] active:scale-95' onClick={() => setManagePopup(true)}>Manage billing</button> : ''
            }
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
          {
            user?.active === true || 
            new Date(user?.subscriptionEndDAte) > new Date() ? (
              <button 
                className='p-3 bg-[#7837eb] mt-2 text-xs xl:text-base text-white rounded hover:bg-[#804cd8] active:scale-95' 
                onClick={() => setShowModal(true)}
              >
                Buy Extra Credits
              </button>
            ) : ''
          }
        </div>
      </div>
      {managePopup && <ManangeSubsPopup setShowPopup={setManagePopup} />}
      <PlanBillsModal setShowModal={setShowModal} showModal={showModal} />
    </div>
  )
}

export default PlansBills