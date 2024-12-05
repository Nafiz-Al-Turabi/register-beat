import React from 'react';
import { FaRegEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const MyBeats = () => {
    const data = [
        { image: "https://via.placeholder.com/50", beatName: "Summer Vibes", totalMatched: "21", regID: "REG001", regDate: "2023-06-15" },
        { image: "https://via.placeholder.com/50", beatName: "Midnight Groove", totalMatched: "11", regID: "REG002", regDate: "2023-06-14" },
        { image: "https://via.placeholder.com/50", beatName: "Urban Flow", totalMatched: "5", regID: "REG003", regDate: "2023-06-13" },
        { image: "https://via.placeholder.com/50", beatName: "Chill Waves", totalMatched: "10", regID: "REG004", regDate: "2023-06-12" },
    ];

    return (
        <div className="p-2 lg:p-4">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-500 to-violet-400 text-transparent bg-clip-text">
                    Registered Beats
                </span>
            </h1>
                <div className="overflow-x-auto md:w-full">
                    <table className="min-w-full border-collapse bg-[#374150] rounded-xl">
                        <thead className="border-b-2 border-gray-700 text-[#ffffff] ">
                            <tr className=' text-xs xl:text-base'>
                                <th className="p-4 text-left">Image</th>
                                <th className="p-4 text-left">Beat Name</th>
                                <th className="p-4 text-left">Registration ID</th>
                                <th className="p-4 text-left">Registration Date</th>
                                <th className="p-4 text-left">Total Matches</th>
                                <th className="p-4 text-left">View Matches</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#ffffff] bg-[#1e2837] rounded-b-full">
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="p-4 text-xs xl:text-base">
                                        <img src={item.image} alt={item.beatName} className="w-12 h-12 rounded-full" />
                                    </td>
                                    <td className="p-4 text-xs xl:text-base font-bold">{item.beatName}</td>
                                    <td className="p-4 text-xs xl:text-base">
                                        <span className="bg-purple-800 text-white px-3 py-1 rounded-full ">
                                            {item.regID}
                                        </span>
                                    </td>
                                    <td className="p-4 text-xs xl:text-base">{item.regDate}</td>
                                    <td className="p-4 text-xs xl:text-base">{item.totalMatched}</td>
                                    <td className="p-4">
                                        <button className="flex items-center gap-2 bg-gradient-to-l to-purple-500 from-[#5046e6] hover:bg-gradient-to-r hover:to-purple-500 hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-xs xl:text-base ">
                                        <FaRegEye /> View Matches
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
        </div>
    );
};

export default MyBeats;
