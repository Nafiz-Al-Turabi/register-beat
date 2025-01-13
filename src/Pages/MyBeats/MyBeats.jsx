import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import BeatDetailsModal from "../../Components/BeatDetailsModal/BeatDetailsModal";

const MyBeats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [beatDetails, setBeatDetails] = useState();

  const openModal = (data) => {
    // console.log('data', data)
    setIsOpen(true);
    setBeatDetails(data);
  };

  // Full data
  const data = [
    {
      image: "https://via.placeholder.com/50",
      beatName: "Summer Vibes",
      totalMatched: "21",
      regID: "REG001",
      regDate: "2023-06-15",
    },
    {
      image: "https://via.placeholder.com/50",
      beatName: "Midnight Groove",
      totalMatched: "11",
      regID: "REG002",
      regDate: "2023-06-14",
    },
    {
      image: "https://via.placeholder.com/50",
      beatName: "Urban Flow",
      totalMatched: "5",
      regID: "REG003",
      regDate: "2023-06-13",
    },
    {
      image: "https://via.placeholder.com/50",
      beatName: "Chill Waves",
      totalMatched: "10",
      regID: "REG004",
      regDate: "2023-06-12",
    },
    {
      image: "https://via.placeholder.com/50",
      beatName: "Oceanic Beats",
      totalMatched: "15",
      regID: "REG005",
      regDate: "2023-06-11",
    },
    {
      image: "https://via.placeholder.com/50",
      beatName: "Lo-fi Dreams",
      totalMatched: "9",
      regID: "REG006",
      regDate: "2023-06-10",
    },
    {
      image: "https://via.placeholder.com/50",
      beatName: "Soulful Vibes",
      totalMatched: "17",
      regID: "REG007",
      regDate: "2023-06-09",
    },
    {
      image: "https://via.placeholder.com/50",
      beatName: "Synth Escape",
      totalMatched: "13",
      regID: "REG008",
      regDate: "2023-06-08",
    },
    {
      image: "https://via.placeholder.com/50",
      beatName: "Trap Nation",
      totalMatched: "22",
      regID: "REG009",
      regDate: "2023-06-07",
    },
    {
      image: "https://via.placeholder.com/50",
      beatName: "Jazz Moods",
      totalMatched: "8",
      regID: "REG010",
      regDate: "2023-06-06",
    },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Determine the data to display on the current page
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] text-white rounded-lg mt-8 animate-from-middle">
      <h1 className="text-xl xl:text-3xl font-bold mb-6">
        <span className="bg-gradient-to-r from-[#7837eb] to-violet-400 text-transparent bg-clip-text">
          Registered Beats
        </span>
      </h1>
      <div className="overflow-x-auto  md:w-full">
        <table className="min-w-full border-collapse">
          <thead className="border-b-2  border-gray-700 text-[#a1afc5]">
            <tr className="text-sm md:text-base">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Beat Name</th>
              <th className="p-4 text-left">Registration ID</th>
              <th className="p-4 text-left">Registration Date</th>
              {/* <th className="p-4 text-left">Total Madatches</th> */}
              <th className="p-4 text-left">View Info</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y-[1px] divide-[#2d344b] text-[#a1afc5]">
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gradient-to-tl hover:to-[#192332] hover:via-[#22314b] hover:from-[#141928]"
              >
                <td className="p-4 text-xs xl:text-base">
                  <img
                    src={item.image}
                    alt={item.beatName}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td
                  className="p-4 text-xs xl:text-base font-medium text-white hover:text-[#7837eb] cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  {item.beatName}
                </td>
                <td className="p-4 text-xs xl:text-base">
                  <span className="bg-[#7837eb] text-white px-3 py-1 rounded-full">
                    {item.regID}
                  </span>
                </td>
                <td className="p-4 text-xs xl:text-base text-white">
                  {item.regDate}
                </td>
                {/* <td className="p-4 text-xs xl:text-base">{item.totalMatched}</td> */}
                <td className="p-4">
                  <button
                    className="flex items-center gap-2 bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-xs xl:text-base"
                    onClick={() => openModal(item)}
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
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="flex justify-center items-center px-4 py-2 w-10 h-10 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        {[...Array(totalPages).keys()].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-[#7837eb] text-white"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="flex justify-center items-center px-4 py-2 w-10 h-10 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>
      <BeatDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        beatDetails={beatDetails}
      />
    </div>
  );
};

export default MyBeats;
