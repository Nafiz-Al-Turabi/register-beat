import React, { useContext, useEffect, useState } from 'react'
import { ImCreditCard } from 'react-icons/im';
import axiosInstance from '../../Axios/AxiosInstance';
import { AuthContext } from '../../Provider/AuthProvider';

const PlanBillsModal = ({ setShowModal, showModal }) => {
    const [input, setInput] = useState(1);
    const [credits, setCredits] = useState(10);
    const [totalCost, setTotalCost] = useState(5);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        setCredits(input * 10)
        setTotalCost(input * 5);
    }, [input])

    const handleCreditPurchase = () => {
        setShowModal(false);
    }
    const handleCredit = async () => {
        try {
            const response = await axiosInstance.post(`/credit/purchase-credits/${user?._id}`);


            if (response.data?.url) {
                window.location.href = response.data.url;
            } else {
                console.error('Redirect URL not found in the response');
            }
        } catch (error) {
            console.error("Error purchasing credits: ", error.response ? error.response.data : error.message);
        }
    };
    return (
        <>
            {showModal ? (
                <>
                    <div className="animate-from-middle justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-6xl">
                            {/*content*/}
                            <div className=" px-4 py-5 border-0 rounded-lg shadow-lg relative flex flex-col gap-2 w-full bg-[#0f0f0f] outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between rounded-t">
                                    <h3 className="text-2xl font-medium">
                                        Purchase Credits
                                    </h3>
                                    <button className=" text-xl" onClick={() => setShowModal(false)}>×</button>
                                </div>
                                <div className="">
                                    <p className='text-base leading-5 md:leading-10 text-[#797979] font-bold'>Buy packages of 10 credits for $5 USD to your 1 credit equals 1 registration.</p>
                                </div>
                                {/* <div className='flex flex-col gap-2'>
                            <h4 className='text-base'>Number of packages:</h4>
                            <div className='flex flex-row gap-2'>
                                <button className={`px-3 flex items-center rounded bg-[#8c50ff] ${input === 1 && 'opacity-50'}`} onClick={() => setInput(input - 1)} disabled={input === 1}>-</button>
                                <input 
                                    type="number" 
                                    value={input} 
                                    className='w-10 rounded bg-[#282828] px-2 py-1 outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                />
                                <button className='px-3 flex items-center rounded bg-[#8c50ff]' onClick={() => setInput(input + 1)}>+</button>
                            </div>
                            <div className='flex justify-between items-center mt-2'>
                                <p className='text-base text-[#797979]'>Total Credits: {credits}</p>
                                <h3 className='text-lg font-bold'>Total Cost: ${totalCost} USD</h3>
                            </div>
                        </div> */}
                                <div className='flex flex-col gap-2 bg-[#282828] p-4 rounded mt-2'>
                                    <p className='text-base'>Payment Method</p>
                                    <div className='flex gap-2 items-center'><ImCreditCard className=' text-[#c4bb8f] text-xl' /> <p className='text-base'>Visa ending in 1234</p></div>
                                </div>
                                <button className='bg-[#8c50ff] rounded py-3 mt-2 active:scale-95' onClick={handleCredit}>Purchase Credits</button>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default PlanBillsModal