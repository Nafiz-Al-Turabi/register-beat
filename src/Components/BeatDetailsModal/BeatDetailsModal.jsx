import React, { useState } from "react";

const BeatDetailsModal = ({ isOpen, setIsOpen, beatDetails }) => {
    
    // console.log('beatDetails', beatDetails)

    const closeModal = () => setIsOpen(false);

    return (
        <div>
            {/* <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                onClick={openModal}
            >
                View Beat Details
            </button> */}

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
                            Registration ID: <span className="font-bold text-white">{beatDetails?.regID}</span>
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <img
                                    src={beatDetails?.image}
                                    alt="Beat Cover"
                                    className="rounded-lg mb-4"
                                />
                                <p>
                                    <span className="font-bold">YouTube Link:</span>{" "}
                                    <a
                                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:underline"
                                    >
                                        https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                    </a>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="font-bold">Genre:</span> Hip Hop
                                </p>
                                <p>
                                    <span className="font-bold">BPM:</span> 120
                                </p>
                                <p>
                                    <span className="font-bold">Key:</span> C Minor
                                </p>
                                <p>
                                    <span className="font-bold">Upload Date:</span> 2023-06-15
                                </p>
                                <p>
                                    <span className="font-bold">Date of Release:</span> 2023-07-01
                                </p>
                                <p>
                                    <span className="font-bold">Are you the only producer?</span>{" "}
                                    No
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold">Collaborators</h3>
                            <p>Name: John Doe</p>
                            <p>Producer Name: JD Beats</p>
                            <p>Collab Percentage: 40%</p>
                        </div>

                        <p className="mt-4">
                            <span className="font-bold">3rd Party Samples:</span> Yes
                        </p>

                        <div className="mt-6 flex justify-end">
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                onClick={() => {
                                    // Add delete functionality here
                                    console.log("Beat deleted");
                                }}
                            >
                                Delete Beat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeatDetailsModal;
