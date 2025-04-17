import React, { useContext, useState } from "react";
import { FaCheck, FaTimes, FaClock, FaSpotify, FaYoutube, FaApple } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import axiosInstance from "../../Axios/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";

const AllMatchesSong = () => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const { user } = useContext(AuthContext);
    const userId = user?._id;

    const availableOn = ["Spotify", "YouTube", "Apple Music"];
    const [songs, setSongs] = useState({});

    const StatusIcon = ({ status }) => {
        switch (status) {
            case "Licensed":
                return <div><FaCheck className="text-green-500" /></div>;
            case "Unauthorized":
                return <FaTimes className="text-red-500" />;
            case "Pending":
                return <FaClock className="text-yellow-500" />;
            default:
                return null;
        }
    };

    const StatusBadge = ({ status }) => {
        const colors = {
            Licensed: "text-green-500",
            Unauthorized: "text-red-500",
            Pending: "text-yellow-500",
        };
        return (
            <div className={`flex items-center gap-2 ${colors[status]} px-2 py-1 rounded-md`}>
                <StatusIcon status={status} />
                <span>{status}</span>
            </div>
        );
    };

    const renderAvailableIcons = (platform, link) => {
        switch (platform) {
            case "Spotify":
                return (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center gap-4 items-center px-4 py-2 rounded">
                        <FaSpotify className="text-green-500 w-6 h-6" />
                        <p className="text-white">Spotify</p>
                    </a>
                );
            case "YouTube":
                return (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center gap-4 items-center px-4 py-2 rounded">
                        <FaYoutube className="text-red-500 w-6 h-6" />
                        <p className="text-white">YouTube</p>
                    </a>
                );
            case "Apple Music":
                return (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center gap-4 items-center px-4 py-2 rounded">
                        <FaApple className="w-6 h-6" />
                        <p className="text-white">Apple Music</p>
                    </a>
                );
            default:
                return null;
        }
    };

    const { isLoading, isError, data: beats = [], error, refetch } = useQuery({
        queryKey: ['adminDashboard', userId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/beat/producer-all-matcheSongs/${userId}`);
            setSongs(response.data);
            //return response.data;
        },
        enabled: Boolean(userId),
    });

    const handleDone = async () => {
        if (!selectedSong || !verificationStatus) {
            alert("Please select a verification status.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/beat/update-match-song/${selectedSong.beatId}/${selectedSong.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: verificationStatus,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong");
            }

            console.log("Update Success:", result);

            // Close modal after successful update
            setSelectedSong(null);
            setVerificationStatus(null);

            // Refetch data from server to show updated status
            refetch();  // 💡 this will update the UI with fresh data

        } catch (error) {
            console.error("Error updating category:", error);
            alert(error.message);
        }
    };

    return (
        <div className="text-white p-6 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-lg">
                    <h3 className="text-gray-400 mb-2">Songs Scanned</h3>
                    <div className="text-4xl font-bold mb-2">{songs.total}</div>
                    <div className="flex items-center text-green-500 text-sm">
                        <span className="mr-1">↑</span> +12% this month
                    </div>
                </div>
                <div className="bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-lg">
                    <h3 className="text-gray-400 mb-2">Songs Licensed</h3>
                    <div className="text-4xl font-bold mb-2">{songs.licensed}</div>
                    <div className="flex items-center text-green-500 text-sm">
                        <span className="mr-1">↑</span> +18% this month
                    </div>
                </div>
                <div className="bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-lg">
                    <h3 className="text-gray-400 mb-2">Unauthorized Beats</h3>
                    <div className="text-4xl font-bold mb-2">{songs.unauthorized}</div>
                    <div className="text-red-500 text-sm">Action required</div>
                </div>
            </div>

            <div className="bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#7837eb] to-violet-400 text-transparent bg-clip-text mb-6">
                    Matches Detected
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="text-gray-400 text-left">
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2">Song name</th>
                                <th className="px-4 py-2">Artist</th>
                                <th className="px-4 py-2">Beat used</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(songs?.songs) && songs.songs.map((song, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-[#232e44] transition cursor-pointer"
                                    onClick={() => setSelectedSong(song)}
                                >
                                    <td className="px-4 py-3 border-t border-[#2d344b]">
                                        <div className="flex items-center gap-3">
                                            <img src={song.image} alt={song.name} className="w-10 h-10 rounded" />
                                            <span>{song.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 border-t border-[#2d344b]">{song.title}</td>
                                    <td className="px-4 py-3 text-gray-400 border-t border-[#2d344b]">{song.artist}</td>
                                    <td className="px-4 py-3 text-gray-400 border-t border-[#2d344b]">{song.beatName}</td>
                                    <td className="px-4 py-3 border-t border-[#2d344b]">
                                        <StatusBadge status={song.category} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog
                open={!!selectedSong}
                onClose={() => {
                    setSelectedSong(null);
                    setVerificationStatus(null);
                }}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    {selectedSong && (
                        <Dialog.Panel className="w-full max-w-4xl rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white shadow-2xl border border-gray-800/50 transition-all duration-300">
                            <button
                                onClick={() => {
                                    setSelectedSong(null);
                                    setVerificationStatus(null);
                                }}
                                className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="pt-8 px-8">
                                <div className="flex gap-5">
                                    <div>
                                        <img src='dewdfewdewd' />
                                        <h1>wdhgwqudgwqui</h1>
                                    </div>



                                    <div>
                                        <h2 className="text-4xl font-bold bg-[#7e3aed] bg-clip-text text-transparent">
                                            {selectedSong.title}
                                        </h2>
                                        <div className="mt-2 flex items-center space-x-2">
                                            <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400">
                                                By {selectedSong.artist}
                                            </span>
                                        </div>
                                        <div>{selectedSong?.category}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex flex-col bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                                        <span className="text-gray-400">Beat Used</span>
                                        <span className="text-white">{selectedSong.beatName}</span>
                                    </div>
                                    <div className="flex flex-col bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                                        <span className="text-gray-400">Release Date</span>
                                        <span className="text-white">{selectedSong.release_date}</span>
                                    </div>
                                    <div className="flex flex-col bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                                        <span className="text-gray-400">Platform</span>
                                        <span className="text-white">All Platform</span>
                                    </div>
                                </div>

                                <div className="gap-2 items-center">
                                    <button
                                        onClick={() => setVerificationStatus("licensed")}
                                        className={`flex-1 px-4 w-full py-4 rounded-md flex items-center gap-2 transition-colors ${verificationStatus === "licensed"
                                            ? "bg-green-500/10 text-green-400"
                                            : "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"
                                            }`}
                                    >
                                        <FaCheck /> Mark as Licensed
                                    </button>
                                    <button
                                        onClick={() => setVerificationStatus("unauthorized")}
                                        className={`flex-1 px-4 w-full py-4 mt-2 rounded-md flex items-center gap-2 transition-colors ${verificationStatus === "unauthorized"
                                            ? "bg-red-500/10 text-red-400"
                                            : "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"
                                            }`}
                                    >
                                        <FaTimes /> Mark as Unauthorized
                                    </button>
                                </div>

                                <div className="flex gap-3 justify-around">
                                    {availableOn.map((platform, idx) => (
                                        <div className="bg-gray-900/50 w-56 backdrop-blur-sm p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300 text-white" key={idx}>
                                            {renderAvailableIcons(platform, selectedSong.song_link)}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <button className="px-4 w-60 py-2 border border-gray-600 rounded-lg text-gray-300 hover:text-white">
                                        Contact Artist
                                    </button>
                                    <button
                                        onClick={handleDone}
                                        className="bg-violet-600 w-60 hover:bg-violet-700 text-white px-6 py-2 rounded-lg"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default AllMatchesSong;
