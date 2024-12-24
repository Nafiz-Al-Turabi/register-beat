import React, { useState } from 'react'
import PlansBills from '../Components/Settings/PlansBills';
import ProfileSetting from '../Components/Settings/ProfileSetting';

const Settings = () => {
    const [settingActive, setSettingActive] = useState(true);
    const [planActive, setPlanActive] = useState(false);

    const handleActive = (value) => {
        // console.log('value', value)
        if (value === 'settings') {
            setPlanActive(false);
            setSettingActive(true);
        } else if (value === 'plans') {
            setSettingActive(false);
            setPlanActive(true);
        }
    }

  return (
    <div className='mx-2'>
        {settingActive && <div className='text-3xl font-bold py-4 mt-4 animate-from-middle'>My Account</div>} 
        {planActive && <div className='text-3xl font-bold py-4 mt-4 animate-from-middle'>Plans & Billing</div>} 
        <div className='flex gap-4  border-b border-[#464646]'>
            <button className={`pb-2 px-4 ${settingActive ? 'border-b-2 border-[#7837eb] text-[#7837eb]' : ''}`} onClick={() => handleActive('settings')}>Settings</button>
            <button className={`pb-2 px-4 ${planActive ? 'border-b-2 border-[#7837eb] text-[#7837eb]' : ''}`} onClick={() => handleActive('plans')}>Plan & Billing</button>
        </div>
        <div className='p-4'>
            {settingActive && (
                <div className='animate-from-middle'>
                    <ProfileSetting />
                </div>
            )}
            {planActive && (
                <div className='animate-from-middle'>
                    <PlansBills />
                </div>
            )}
        </div>
    </div>
  )
}

export default Settings