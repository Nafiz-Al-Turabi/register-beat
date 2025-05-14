import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCheck, FaTimes, FaClock, FaSpotify, FaYoutube, FaApple } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import axiosInstance from "../../Axios/AxiosInstance";
import { AuthContext } from "../../Provider/AuthProvider";
import fileUrl from "../../Axios/fileUrl";
import Loading from "../../Components/Loading/Loading";
import { SiApplemusic } from "react-icons/si";
//import { FiMessageSquare } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Crown, Pause, Play } from "lucide-react";
import Addon from "../../Components/Addonpage/Addon";

const AllMatchesSong = () => {
    const navigate = useNavigate();
    const [selectedSong, setSelectedSong] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const [lastsong, setLastsong] = useState(null)
    const userId = user?._id;

    const [currentlyPlayingSongId, setCurrentlyPlayingSongId] = useState(null);
    const audioRefs = useRef({});

    const handlePlayPause = (e, songId) => {
        e.stopPropagation();


        if (currentlyPlayingSongId === songId) {

            audioRefs.current[songId].pause();
            setCurrentlyPlayingSongId(null);
        } else {

            if (currentlyPlayingSongId !== null && audioRefs.current[currentlyPlayingSongId]) {
                audioRefs.current[currentlyPlayingSongId].pause();
            }


            if (audioRefs.current[songId]) {
                audioRefs.current[songId].play();
                setCurrentlyPlayingSongId(songId);
            }
        }
    };
    useEffect(() => {

        const handleAudioEnd = () => {
            setCurrentlyPlayingSongId(null);
        };


        Object.keys(audioRefs.current).forEach(songId => {
            const audio = audioRefs.current[songId];
            if (audio) {
                audio.addEventListener('ended', handleAudioEnd);
            }
        });


        return () => {
            Object.keys(audioRefs.current).forEach(songId => {
                const audio = audioRefs.current[songId];
                if (audio) {
                    audio.removeEventListener('ended', handleAudioEnd);
                }
            });
        };
    }, [audioRefs.current]);





    const availableOn = ["Spotify", "YouTube", "Apple Music"];
    const [songs, setSongs] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleClick = () => {
        if (window.confirm("Are you sure this is not your beat?")) {
            notMyBeat();
        }
    };

    const fetchSongs = async () => {
        if (!userId) return;
        setVerificationStatus('')
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/beat/producer-all-matcheSongs/${userId}`);
            setSongs(response.data);
        } catch (err) {
            setError("Failed to fetch songs");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, [userId]);

    const StatusBadge = ({ status }) => {
        switch (status) {
            case "Licensed":
                return (
                    <div className="flex items-center gap-1 bg-green-900/20 px-3 py-1 rounded-lg text-sm font-medium w-28 ">
                        <IoMdCheckmarkCircleOutline className="text-green-500 w-4" />
                        <span className="text-green-500">Licensed</span>
                    </div>
                );
            case "Unauthorized":
                return (
                    <div className="flex items-center gap-1 bg-red-900/20 px-3 py-1 rounded-lg text-sm font-medium w-36">
                        <FaRegCircleXmark className="text-red-500 w-30" />
                        <span className="text-red-500">Unauthorized</span>
                    </div>
                );
            case "Pending":
                return (
                    <div className="flex items-center gap-1 bg-yellow-900/20 px-3 py-1 rounded-lg text-sm font-medium w-28">
                        <FaClock className="text-yellow-500" />
                        <span className="text-yellow-500">Pending</span>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderAvailableIcons = (platform, link) => {
        switch (platform) {
            case "Spotify":
                return (
                    <a href={`${link}?spotify`} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center gap-4 items-center px-4 py-2 rounded">
                        <FaSpotify className="text-green-500 w-6 h-6" />
                        <p className="text-white">Spotify</p>
                    </a>
                );
            case "YouTube":
                return (
                    <a href={`${link}?youtube`} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center gap-4 items-center px-4 py-2 rounded">
                        <FaYoutube className="text-red-600 w-6 h-6" />
                        <p className="text-white">YouTube</p>
                    </a>
                );
            case "Apple Music":
                return (
                    <a href={`${link}?applemusic`} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center gap-4 items-center px-4 py-2 rounded">
                        <SiApplemusic className="w-6 h-6 text-red-600 m-0 p-0 bg-white rounded-lg " />
                        <p className="text-white">Apple Music</p>
                    </a>
                );
            default:
                return null;
        }
    };

    const handleDone = async () => {
        if (!selectedSong || !verificationStatus) {
            alert("Please select a verification status.");
            return;
        }

        try {
            const response = await axiosInstance.put(
                `/beat/update-match-song/${selectedSong.beatId}/${selectedSong.id}`,
                { category: verificationStatus }
            );

            console.log("Update Success:", response.data);
            setSelectedSong(null);
            setVerificationStatus(null);

            // Refetch updated data
            fetchSongs();

        } catch (error) {
            console.error("Error updating category:", error);
            alert(error.message);
        }
    };

    const notMyBeat = async () => {
        try {
            const response = await axiosInstance.put(
                `/beat/not-my-beat/${selectedSong.beatId}/${selectedSong.id}`,

            );
            console.log("Delete Success:", response.data);
            setSelectedSong(null);
            fetchSongs();

        } catch (error) {
            console.error("Error updating category:", error);
            alert(error.message);
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;


    const visibleSongs = songs?.songs?.filter(song => !song.hide) || [];

    const totalSongs = visibleSongs.length;
    const totalPages = Math.ceil(totalSongs / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedSongs = visibleSongs.slice(startIndex, startIndex + rowsPerPage);

    return (
        <>
            {user && !user.isUltraPlan ? (
                // Show ONLY the upgrade modal when user exists without Ultra Plan
              <Addon/>

            ) : (
                // Show dashboard content when either:
                // 1. No user exists OR
                // 2. User has Ultra Plan
                songs && songs.total > 0 ? (
                    <div className="text-white p-6 bg-black">
                        <h1 className="text-3xl font-bold pb-8">Beat Analytics Dashboard</h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-900/80 p-6 rounded-lg">
                                <h3 className="text-gray-400 mb-2">Songs Scanned</h3>
                                <div className="text-5xl font-bold mb-2">{songs.total}</div>

                            </div>
                            <div className="bg-gray-900/80 p-6 rounded-lg">
                                <h3 className="text-gray-400 mb-2">Songs Licensed</h3>
                                <div className="text-5xl font-bold mb-2">{songs.Licensed}</div>

                            </div>
                            <div className="bg-gray-900/80 p-6 rounded-lg">
                                <h3 className="text-gray-400 mb-2">Unauthorized Beats</h3>
                                <div className="text-5xl font-bold mb-2">{songs.Unauthorized}</div>
                                <div className="text-red-500 text-sm">Action required</div>
                            </div>
                        </div>

                        <div className="bg-gray-900/80 p-6 rounded-lg mb-8">
                            <h2 className="text-2xl font-semibold text-green-400 mb-6">Matches Detected</h2>

                            <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 mb-6">
                                <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg justify-between sm:justify-start">
                                    <span>All</span>
                                    <span className="ml-2 px-2 py-0.5 bg-gray-700 rounded-md">{songs.total}</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-500 justify-between sm:justify-start bg-gray-800 sm:bg-transparent px-4 py-2 sm:px-0 sm:py-0 rounded-full sm:rounded-none">
                                    <IoMdCheckmarkCircleOutline className="mr-1" />
                                    <span>Licensed</span>
                                    <span className="ml-2 px-2 py-0.5 bg-gray-800 rounded-md">{songs.Licensed}</span>
                                </div>
                                <div className="flex items-center gap-2 text-red-500 justify-between sm:justify-start bg-gray-800 sm:bg-transparent px-4 py-2 sm:px-0 sm:py-0 rounded-full sm:rounded-none">
                                    <FaRegCircleXmark className="mr-1" />
                                    <span>Unauthorized</span>
                                    <span className="ml-2 px-2 py-0.5 bg-gray-800 rounded-md">{songs.Unauthorized}</span>
                                </div>
                                <div className="flex items-center gap-2 text-yellow-500 justify-between sm:justify-start bg-gray-800 sm:bg-transparent px-4 py-2 sm:px-0 sm:py-0 rounded-full sm:rounded-none">
                                    <FaClock className="mr-1" />
                                    <span>Pending</span>
                                    <span className="ml-2 px-2 py-0.5 bg-gray-800 rounded-md">{songs.Pending}</span>
                                </div>
                            </div>


                            {loading ? (
                                <Loading />
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-[640px] w-full">
                                        <thead>
                                            <tr className="text-gray-400 text-left border-b border-gray-800">
                                                <th className="px-4 py-3">lmage                                                                                                                                                                            </th>
                                                <th className="px-4 py-3">Song name</th>
                                                <th className="px-4 py-3">Artist</th>
                                                <th className="px-4 py-3">Beat used</th>
                                                <th className="px-4 py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(paginatedSongs) && paginatedSongs.map((song, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-gray-800/50 transition cursor-pointer"
                                                    onClick={() => setSelectedSong(song)}
                                                >
                                                    <td className="px-4 py-4 border-b border-gray-800 whitespace-nowrap">
                                                        <div className="relative group  w-16 h-16 rounded overflow-hidden">

                                                            <div className="relative w-16 h-16 rounded overflow-hidden">

                                                                <div className="absolute inset-0  bg-gradient-to-t from-teal-900 to-transparent opacity-40 z-10"></div>


                                                                <img
                                                                    src={song?.media?.image || "/api/placeholder/160/160"}
                                                                    alt={song?.name || "Zen Garden"}
                                                                    className="w-16 h-16 rounded object-cover"
                                                                />



                                                            </div>


                                                            {song?.media?.audio && (
                                                                <>
                                                                    <button
                                                                        onClick={(e) => handlePlayPause(e, song.id)}
                                                                        className="absolute inset-0 flex items-center justify-center w-full h-full rounded bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-200 z-20"
                                                                        aria-label={currentlyPlayingSongId === song.id ? 'Pause' : 'Play'}
                                                                    >
                                                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-25 border border-white">
                                                                            {currentlyPlayingSongId === song.id ? (
                                                                                <Pause className="w-4 h-4 text-white" />
                                                                            ) : (
                                                                                <Play className="w-4 h-4 text-white ml-0.5" />
                                                                            )}
                                                                        </div>
                                                                    </button>

                                                                    {/* Hidden audio element */}
                                                                    <audio
                                                                        ref={el => { if (el) audioRefs.current[song.id] = el; }}
                                                                        src={song?.media?.audio}
                                                                        preload="metadata"
                                                                    />
                                                                </>
                                                            )}

                                                            {/* Optional subtitle at bottom */}
                                                            {song?.subtitle && (
                                                                <div className="absolute bottom-1 left-0 right-0 text-center z-20">
                                                                    <p className="text-white text-xs truncate px-1">{song.subtitle}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 border-b border-gray-800 whitespace-nowrap">
                                                        {song.title}
                                                    </td>
                                                    <td className="px-4 py-4 text-gray-400 border-b border-gray-800 whitespace-nowrap">
                                                        {song.artist}
                                                    </td>
                                                    <td className="px-4 py-4 text-gray-400 border-b border-gray-800 whitespace-nowrap">
                                                        {song.beatName}
                                                    </td>
                                                    <td className="px-4 py-4 border-b border-gray-800 whitespace-nowrap">
                                                        <StatusBadge status={song.category} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center mt-4 space-x-2">
                                            <button
                                                className="px-3 py-1 border rounded text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                            <span className="text-gray-400">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <button
                                                className="px-3 py-1 border rounded text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}

                                </div>

                            )}
                        </div>

                        <Dialog
                            open={!!selectedSong}
                            onClose={() => {
                                setSelectedSong(null);
                                setVerificationStatus('');
                            }}
                            className="relative z-50"
                        >
                            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                            <div className="fixed inset-0 flex items-center justify-center p-4">
                                {selectedSong && (
                                    <Dialog.Panel className="w-full max-w-4xl max-h-screen rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white shadow-2xl border border-gray-800/50 transition-all duration-300 overflow-auto">
                                        <button onClick={() => { setSelectedSong(null); setVerificationStatus(''); }} className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
                                            <span className="sr-only">Close</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        <div className="pt-8 px-8">
                                            <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-4">

                                                {/* Left section - song image and info */}
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    <div className="flex items-center justify-center mb-4 sm:mb-0">
                                                        {/* <img src={`${fileUrl}/${selectedSong?.imageUrl}`} className="w-24 h-24 rounded-md object-cover shadow-md" /> */}



                                                        <td className="px-4 py-4 border-b border-gray-800 whitespace-nowrap">
                                                            <div className="relative group  w-20 h-20 rounded overflow-hidden">

                                                                <div className="relative w-20 h-20 rounded overflow-hidden">

                                                                    <div className="absolute inset-0  bg-gradient-to-t from-teal-900 to-transparent opacity-40 z-10"></div>


                                                                    <img
                                                                        src={selectedSong?.media?.image || "/api/placeholder/160/160"}
                                                                        alt={selectedSong?.name || "Zen Garden"}
                                                                        className=" w-20 h-20 rounded object-cover"
                                                                    />



                                                                </div>


                                                                {selectedSong?.media?.audio && (
                                                                    <>
                                                                        <button
                                                                            onClick={(e) => handlePlayPause(e, selectedSong.id)}
                                                                            className="absolute inset-0 flex items-center justify-center w-full h-full rounded bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-200 z-20"
                                                                            aria-label={currentlyPlayingSongId === selectedSong.id ? 'Pause' : 'Play'}
                                                                        >
                                                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-25 border border-white">
                                                                                {currentlyPlayingSongId === selectedSong.id ? (
                                                                                    <Pause className="w-4 h-4 text-white" />
                                                                                ) : (
                                                                                    <Play className="w-4 h-4 text-white ml-0.5" />
                                                                                )}
                                                                            </div>
                                                                        </button>

                                                                        {/* Hidden audio element */}
                                                                        <audio
                                                                            ref={el => { if (el) audioRefs.current[selectedSong.id] = el; }}
                                                                            src={selectedSong?.media?.audio}
                                                                            preload="metadata"
                                                                        />
                                                                    </>
                                                                )}

                                                                {/* Optional subtitle at bottom */}
                                                                {selectedSong?.subtitle && (
                                                                    <div className="absolute bottom-1 left-0 right-0 text-center z-20">
                                                                        <p className="text-white text-xs truncate px-1">{selectedSong.subtitle}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </div>

                                                    <div className="text-center sm:text-left">
                                                        <h2 className="text-2xl sm:text-4xl font-bold bg-[#7e3aed] bg-clip-text text-transparent">
                                                            {selectedSong.title}
                                                        </h2>
                                                        <div className="mt-2">
                                                            <span className="px-3 py-1 text-sm text-gray-400 block sm:inline">
                                                                By {selectedSong.artist}
                                                            </span>
                                                        </div>
                                                        <div >
                                                            <StatusBadge status={selectedSong.category} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right section - button */}
                                                <div className="flex sm:items-start justify-center sm:justify-end">
                                                    <button onClick={handleClick} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium hover:border-red-400 hover:border transition-all duration-200">
                                                        <FaRegCircleXmark className="text-red-500 w-3 h-3" />
                                                        Not my beat
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="p-8 space-y-8">
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                                <div className="flex flex-col bg-gray-900/50 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                                                    <span className="text-gray-400">Beat Used</span>
                                                    <span className="text-white">{selectedSong.beatName}</span>
                                                </div>
                                                <div className="flex flex-col bg-gray-900/50 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                                                    <span className="text-gray-400">Release Date</span>
                                                    <span className="text-white">{selectedSong.release_date}</span>
                                                </div>
                                                <div className="flex flex-col bg-gray-900/50 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                                                    <span className="text-gray-400">Platform</span>
                                                    <span className="text-white">All Platforms</span>
                                                </div>
                                            </div>

                                            <h3>License Status</h3>
                                            <div className="items-center">
                                                <button
                                                    onClick={() => setVerificationStatus("Licensed")}
                                                    className={`flex-1 px-4 w-full py-4 rounded-md mt-0 flex items-center justify-between transition-colors ${verificationStatus === "Licensed" || (verificationStatus === '' && selectedSong.category === "Licensed") ? "bg-green-500/10 text-green-400 border-2 border-green-400" : "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"}`}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        <IoMdCheckmarkCircleOutline className="text-green-500 w-5 h-5" />
                                                        <span>Mark as Licensed</span>
                                                    </span>
                                                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                                                </button>

                                                <button
                                                    onClick={() => setVerificationStatus(verificationStatus === "Unauthorized" ? "" : "Unauthorized")}
                                                    className={`flex-1 px-4 w-full py-4 mt-2 rounded-md flex items-center justify-between transition-colors ${verificationStatus === "Unauthorized" || (verificationStatus === '' && selectedSong.category === "Unauthorized") ? "bg-red-500/10 text-red-400 border-2 border-red-400" : "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"}`}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        <FaRegCircleXmark className="text-red-500 w-5 h-5" />
                                                        <span>Mark as Unauthorized</span>
                                                    </span>
                                                    <IoIosCheckmarkCircle className="text-red-500 w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex gap-3 justify-around flex-wrap">
                                                {availableOn.map((platform, idx) => (
                                                    <div
                                                        className="bg-gray-900/50 w-56 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300 text-white flex-1 sm:w-56 md:w-64 lg:w-72 xl:w-80"
                                                        key={idx}
                                                    >
                                                        {renderAvailableIcons(platform, selectedSong.song_link)}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex gap-4 justify-between items-center">
                                                <button onClick={() => { openModal(); setLastsong(selectedSong); setSelectedSong(null); }} className="px-4 text-center w-full py-2 border border-gray-600 rounded-lg  hover:text-white bg-gray-700/30 text-gray-400 hover:bg-gray-700/50">
                                                    <div className="flex gap-4 justify-center">
                                                        <FiMessageSquare className="w-6 h-6" />
                                                        <p>Contact Artist</p>
                                                    </div>
                                                </button>
                                                <button onClick={handleDone} className="bg-violet-600 w-full hover:bg-violet-700 text-white px-6 py-2 rounded-lg">
                                                    Done
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                )}

                            </div>
                        </Dialog>


                        {isModalOpen && (
                            <div className="fixed inset-0 bg-gray-800/60 flex items-center justify-center z-50">
                                <div className="bg-[#111111] text-white rounded-lg p-8 max-w-lg w-full relative">
                                    <button
                                        onClick={closeModal}
                                        className="absolute right-4 top-4 text-gray-400 hover:text-white"
                                    >
                                        <IoIosCloseCircleOutline className="w-6 h-6" />
                                    </button>
                                    <h2 className="text-2xl font-bold mb-4">How to Contact the Artist</h2>
                                    <p className="mb-6  text-sm opacity-50">Follow these steps to contact the artist and negotiate the use of your beat. By approaching it this way, you can turn the artist into a regular client and increase your earnings.</p>

                                    <div className="space-y-4">
                                        {/* Step 1 */}
                                        <div className="bg-[#101726] p-4 rounded-lg">
                                            <h3 className="font-semibold text-lg">Step 1: Find Contact Information</h3>
                                            <p className=" text-sm opacity-50">Go to the song link and look for any direct contact with the artist (Instagram, Email, etc.).</p>
                                            <a
                                                href={lastsong.song_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-2 px-4 py-2 bg-[#7b39ed] text-white rounded-md flex items-center justify-center"
                                            >
                                                <span className="mr-2">Go to Song Link</span>
                                            </a>
                                        </div>

                                        {/* Step 2 */}
                                        <div className="bg-[#101726] p-4 rounded-lg">
                                            <h3 className="font-semibold text-lg">Step 2: Use Message Template</h3>
                                            <p className=" text-sm opacity-50">Use one of our message templates to contact the artist. Choose your preferred language:</p>
                                            <div className=" flex justify-between gap-4 mt-2">
                                                <button onClick={() => { navigate("/dashboard/english-template") }} className="px-4 py-2 bg-[#7b39ed] text-white rounded-md flex items-center justify-center">
                                                    <span className="mr-2">English Template</span>
                                                </button>
                                                <button onClick={() => { navigate("/dashboard/spanish-template") }} className="px-4 py-2 bg-[#7b39ed] text-white rounded-md flex items-center justify-center">
                                                    <span className="mr-2">Spanish Template</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Step 3 */}
                                        <div className="bg-[#101726] p-4 rounded-lg">
                                            <h3 className="font-semibold text-lg">Step 3: Customize and Send</h3>
                                            <p className=" text-sm opacity-50">Customize the template with the specific details of your case and send it to the artist through the contact method you found.</p>
                                        </div>

                                        <p className="mt-4 text-xs text-gray-400">
                                            Remember to maintain a professional and friendly tone in your communication. This approach can help you build long-term relationships with artists and create more opportunities for collaboration and income.
                                        </p>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={closeModal}
                                            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md text-sm"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    loading ? (
                        <Loading />
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="flex items-center bg-gray-800 h-96 justify-center text-white">
                            <h2 className="text-5xl font-bold">No Matches song Found</h2>
                        </div>
                    )
                )
            )}
        </>
    );

};

export default AllMatchesSong;
