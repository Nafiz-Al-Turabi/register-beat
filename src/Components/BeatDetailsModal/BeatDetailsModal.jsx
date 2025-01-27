import React, { useState } from "react";
import fileUrl from "../../Axios/fileUrl";

const BeatDetailsModal = ({ isOpen, setIsOpen, beatDetails }) => {


    const closeModal = () => setIsOpen(false);

    return (
        <div className="">
            {/* <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                onClick={openModal}
            >
                View Beat Details
            </button> */}

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-from-middle">
                    <div className="bg-[#111111] text-white rounded-lg p-8 w-[90%] md:w-[50%]">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold">{beatDetails?.beatName}</h2>
                            <button
                                className="text-gray-400 hover:text-white text-2xl font-bold"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Registration ID: <span className="font-bold text-white">{beatDetails?.registrasionId}</span>
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <div>
                                    <img
                                        src={`${fileUrl}/${beatDetails?.imagePath}`}
                                        alt="Beat Cover"
                                        className="w-32 h-32 object-cover rounded-lg mb-4"
                                    />
                                </div>
                                <p>
                                    <span className="font-bold">YouTube Link:</span>{" "}
                                    <a
                                        href={beatDetails?.youtubeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:underline"
                                    >
                                        {beatDetails?.youtubeUrl}
                                    </a>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="font-bold">Genre:</span> {beatDetails?.genre}
                                </p>
                                <p>
                                    <span className="font-bold">BPM:</span> {beatDetails?.bpm}
                                </p>
                                <p>
                                    <span className="font-bold">Key:</span> C Minor
                                </p>
                                <p>
                                    <span className="font-bold">Upload Date:</span> {new Date(beatDetails?.createdAt).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-bold">Date of Release:</span> {new Date(beatDetails?.releaseDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-bold">Are you the only producer?</span>{" "}
                                    {beatDetails?.isOnlyProducer ? "Yes" : "No"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold">Collaborators</h3>
                            <p>Name: {beatDetails?.fullName}</p>
                            <p>Producer Name: {beatDetails?.producerName}</p>
                            <p>Collab Percentage: {beatDetails?.percentage}%</p>
                        </div>

                        <p className="mt-4">
                            <span className="font-bold">3rd Party Samples:</span> {beatDetails?.containsSamples ? "Yes" : "No"}
                        </p>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                onClick={() => {
                                    // Add delete functionality here
                                    console.log("Beat deleted");
                                }}>
                                Download Certificate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeatDetailsModal;
