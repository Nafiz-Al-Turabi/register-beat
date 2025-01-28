import React from "react";
import fileUrl from "../../Axios/fileUrl";
import { RiErrorWarningLine } from "react-icons/ri";

const BeatDetailsModal = ({ isOpen, setIsOpen, beatDetails }) => {
    if (!isOpen) return null;

    const closeModal = () => setIsOpen(false);

    const StatCard = ({ title, value, className = "" }) => (
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
            <div className="text-gray-400 text-sm mb-1">{title}</div>
            <div className={`font-semibold ${className}`}>{value}</div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
            <div
                className="min-h-screen flex items-center justify-center p-4"
                onClick={closeModal}
            >
                <div
                    className="relative w-full max-w-4xl rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white shadow-2xl border border-gray-800/50"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Top Decorative Bar */}
                    

                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                    >
                        <span className="sr-only">Close</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Header Section */}
                    <div className="pt-8 px-8">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {beatDetails?.beatName}
                        </h2>
                        <div className="mt-2 flex items-center space-x-2">
                            <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400">
                                ID: {beatDetails?.registrasionId}
                            </span>
                            <span className="px-3 py-1 bg-purple-900/30 rounded-full text-xs text-purple-300">
                                {beatDetails?.genre}
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-8 space-y-8">
                        {/* Image and Primary Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                {/* Beat Image */}
                                <div className=" w-full h-44 group relative overflow-hidden rounded-xl ">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img
                                        src={`${fileUrl}/${beatDetails?.imagePath}`}
                                        alt="Beat Cover"
                                        className="w-full aspect-square object-cover rounded-xl transform transition-transform group-hover:scale-105"
                                    />
                                </div>

                                <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-base font-bold text-gray-400">Status:</h1>
                                        <p className="text-xs">{beatDetails?.registrationStatus}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-base font-bold text-gray-400">Registrasion code:</h1>
                                        <p className="text-xs">{beatDetails?.registerCode}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                                    <div>
                                        <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            Certificate:
                                        </h1>
                                        <p className="text-sm">
                                            {beatDetails?.certificateUrl
                                                ? beatDetails.certificateUrl.startsWith("http")
                                                    ? "Your certificate is ready to download"
                                                    : <span className="text-sm bg-red-400/20 p-0.5 px-1 lg:px-2 rounded-md flex items-center gap-2"> <RiErrorWarningLine  className="text-red-500 text-base lg:text-base" />{beatDetails.certificateUrl}</span>
                                                : "It will take up to 24 hours to generate."}
                                        </p>
                                    </div>
                                </div>

                                {/* YouTube Link */}
                                <a
                                    href={beatDetails?.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="text-red-500">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                            </svg>
                                        </div>
                                        <span className="text-red-400 hover:text-red-300 truncate">Watch on YouTube</span>
                                    </div>
                                </a>

                            </div>

                            <div className="space-y-6">
                                {/* Beat Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <StatCard title="BPM" value={beatDetails?.bpm} className="text-purple-400" />
                                    <StatCard title="Type" value="Music" className="text-pink-400" />
                                    <StatCard
                                        title="Upload Date"
                                        value={new Date(beatDetails?.createdAt).toLocaleDateString()}
                                    />
                                    <StatCard
                                        title="Release Date"
                                        value={new Date(beatDetails?.releaseDate).toLocaleDateString()}
                                    />
                                </div>

                                {/* Collaborators Section */}
                                <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl space-y-4">
                                    <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Collaborators
                                    </h3>
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Artist</span>
                                            <span className="font-medium">{beatDetails?.fullName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Producer</span>
                                            <span className="font-medium">{beatDetails?.producerName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Share</span>
                                            <span className="font-medium text-purple-400">{beatDetails?.percentage}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <StatCard
                                        title="Solo Producer"
                                        value={beatDetails?.isOnlyProducer === true ? "Yes" : "No"}
                                        className="flex-1"
                                    />
                                    <StatCard
                                        title="3rd Party Samples"
                                        value={beatDetails?.containsSamples === true ? "Yes" : "No"}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    {beatDetails?.certificateUrl?.startsWith("http") && (
                        <div className="p-4 border-t border-gray-800/50">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => window.open(beatDetails.certificateUrl, '_blank')}
                                    className="px-8 py-3  bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] rounded-md transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                >
                                    Download Certificate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BeatDetailsModal;