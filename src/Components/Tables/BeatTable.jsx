import { FaRegEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axiosInstance from '../../Axios/AxiosInstance';
import { useState } from 'react';
import BeatDetailsModal from '../BeatDetailsModal/BeatDetailsModal';

const BeatTable = ({ beats }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [beatDetails, setBeatDetails] = useState();
    console.log("Beats", beats);
    const openModal = async (beatId) => {
        try {
            const response = await axiosInstance.get(`/beat/oneBeatDetails/${beatId}`);
            setBeatDetails(response.data?.beat);
            setIsOpen(true);
        } catch (error) {
            console.error("Failed to fetch beat details:", error);
        }
    };
    return (
        <>
            {beats?.map((beat) => (
                <tr
                    key={beat?._id}
                    className="hover:bg-gradient-to-tl hover:to-[#192332] hover:via-[#22314b] hover:from-[#141928]"
                >
                    <td className="p-4 text-xs xl:text-base">
                        <img
                            src={beat.image || 'default-image-url.jpg'}
                            alt={beat.name || 'Beat Image'}
                            className="w-12 h-12 rounded-full"
                        />
                    </td>
                    <td
                        className="p-4 text-xs xl:text-base font-medium text-white hover:text-[#7837eb] cursor-pointer"
                    >
                        {beat?.beatName || 'N/A'}
                    </td>
                    <td className="p-4 text-xs xl:text-base">
                        <span className="bg-[#7837eb] text-white px-3 py-1 rounded-full">
                            {beat?.registerCode || 'N/A'} 
                        </span>
                    </td>
                    <td className="p-4 text-xs xl:text-base text-white">
                        {new Date(beat?.createdAt).toLocaleDateString() || 'N/A'}
                    </td>
                    <td className="p-4">
                        <button
                            onClick={() => openModal(beat?._id)}
                            className="flex items-center gap-2 bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-xs xl:text-base"
                        >
                            <FaRegEye /> More info
                        </button>
                    </td>
                </tr>
            ))}

            <BeatDetailsModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                beatDetails={beatDetails}
            />
        </>
    );
};

export default BeatTable;
