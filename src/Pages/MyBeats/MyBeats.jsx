import React, { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import BeatDetailsModal from "../../Components/BeatDetailsModal/BeatDetailsModal";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Axios/AxiosInstance";
import { AuthContext } from "../../Provider/AuthProvider";
import { PiMusicNotesSimple } from "react-icons/pi";
import moment from 'moment';
import fileUrl from "../../Axios/fileUrl";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const MyBeats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [beatDetails, setBeatDetails] = useState();
  const { user } = useContext(AuthContext);
  const userId = user?._id;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const openModal = (data) => {
    setIsOpen(true);
    setBeatDetails(data);
  };

  const { isLoading, isError, data: beats = [], error, refetch } = useQuery({
    queryKey: ['adminDashboard', userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/beat/get-beats/${userId}`);
      // refetch();
      console.log(response.data?.beats);
      return response.data?.beats;
    },
    enabled: Boolean(userId),
  });

  const offset = currentPage * itemsPerPage;
  const currentBeats = beats.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(beats.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] text-white rounded-lg mt-8 animate-from-middle">
      <h1 className="text-xl xl:text-3xl font-bold mb-6">
        <span className="bg-gradient-to-r from-[#7837eb] to-violet-400 text-transparent bg-clip-text">
          Registered Beats
        </span>
      </h1>
      {
        beats.length > 0 ? (
          <div className="overflow-x-auto md:w-full">
            <table className="min-w-full border-collapse">
              <thead className="border-b-2 border-gray-700 text-[#a1afc5]">
                <tr className="text-sm md:text-base">
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Beat Name</th>
                  <th className="p-4 text-left">Registration ID</th>
                  <th className="p-4 text-left">Registration Date</th>
                  <th className="p-4 text-left">View Info</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-[1px] divide-[#2d344b] text-[#a1afc5]">
                {currentBeats?.map((beat, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gradient-to-tl hover:to-[#192332] hover:via-[#22314b] hover:from-[#141928]"
                  >
                    <td className="p-4 text-xs xl:text-base">
                      <img
                        src={`${fileUrl}/uploads/images/${beat?.imagePath}`}
                        alt={beat?.beatName}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td
                      className="p-4 text-xs xl:text-base font-medium text-white hover:text-[#7837eb] cursor-pointer"
                      onClick={() => openModal(beat)}
                    >
                      {beat?.beatName}
                    </td>
                    <td className="p-4 text-xs xl:text-base">
                      <span className="bg-[#7837eb] text-white px-3 py-1 rounded-full">
                        {beat?.registrasionId}
                      </span>
                    </td>
                    <td className="p-4">{moment(beat?.updatedAt).format('MMMM Do YYYY')}</td>
                    <td className="p-4">
                      <button
                        className="flex items-center gap-2 bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-xs xl:text-base"
                        onClick={() => openModal(beat)}
                      >
                        <FaRegEye /> More info
                      </button>
                    </td>
                    <td className="p-4">
                      <button className="flex items-center gap-2 bg-gradient-to-l to-red-400 from-red-500 hover:bg-gradient-to-r hover:to-red-400 hover:from-red-500 duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-xs xl:text-base">
                        <MdDelete /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-end">
            <ReactPaginate
                    previousLabel={"←"}
                    nextLabel={"→"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={"flex justify-end mt-4 space-x-4"}
                    activeClassName={"font-bold bg-violet-600/20"}
                    pageClassName={"px-3 py-1 border border-zinc-600 rounded text-white"}
                    previousClassName={
                        "px-3 py-1 border border-zinc-600 rounded text-white"
                    }
                    nextClassName={"px-3 py-1 border border-zinc-600 rounded text-white"}
                    breakClassName={"px-3 py-1 text-zinc-400"}
                />
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className='flex justify-center text-9xl text-[#6b7c96]'><PiMusicNotesSimple /></p>
            <p className="text-xl xl:text-3xl text-[#adbace] font-bold">No recent activity</p>
            <p className="text-xl text-[#6b7c96]">Start by registering your first beat to see activity here.</p>
            <div>
              <Link to='/register-beat'>
                <button className='p-3 px-5 mt-4 bg-[#825aeb] rounded-md text-xl font-bold hover:bg-[#6d40df] duration-200 ease-linear'>Register a Beat</button>
              </Link>
            </div>
          </div>
        )
      }

      <BeatDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        beatDetails={beatDetails}
      />
    </div>
  );
};

export default MyBeats;