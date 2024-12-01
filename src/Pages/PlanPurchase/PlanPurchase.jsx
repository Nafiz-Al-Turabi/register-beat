import React from 'react'
import Faqs from '../../Components/PlanPurchase.jsx/Faqs'

const PlanPurchase = () => {
  return (
    <div className='py-12 animate-from-middle'>
        <h1 className='text-4xl font-bold text-center'>Choose Your Plan</h1>
        <div className='max-w-2xl mx-auto my-24'>
            <div className='flex flex-col border-2 border-[#7837eb] rounded-md bg-[#0f1423]'>
                <div className='flex flex-row justify-between'>
                    <div></div>
                    <p className='px-3 py-1 bg-[#7837eb] rounded-bl-md text-sm font-semibold'>Popular</p>
                </div>
                <div className='px-6 pb-6 flex flex-col gap-4'>
                    <h3 className='text-xl font-bold'>Pro</h3>
                    <h3 className='text-2xl font-bold'>$9.99 <span className='font-normal text-sm'>/month</span></h3>
                    <ul role="list" class="flex flex-col gap-2">
                        <li class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-sm">Register 20 Beats month</span>
                        </li>
                        <li class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-sm">Advanced protection</span>
                        </li>
                        <li class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-sm">Analytics Dashboard</span>
                        </li>
                        <li class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-sm">Copyright analysis</span>
                        </li>
                        <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-sm">Get Extra Credits to Register More Beats</span></li>
                    </ul>
                    <button className='py-2 bg-[#14a046] text-xs xl:text-base font-medium text-white rounded-full hover:bg-[#14a046] mt-3'>Get Pro</button>
                </div>
            </div>
        </div>
        <div>
            <Faqs />
        </div>
    </div>
  )
}

export default PlanPurchase