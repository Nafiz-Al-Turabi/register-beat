import { Crown } from 'lucide-react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Addon = () => {
   const navigate = useNavigate();
   const { user } = useContext(AuthContext);
   const dateOnly = user?.subscriptionEndDAte.split('T')[0];
    return (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-gray-900 border border-purple-900/30 rounded-xl w-96  text-center p-6 shadow-lg">
                        {/* Crown Logo */}
                        <div className="relative inline-block mb-4">
                          <div className="bg-[#702cdd] rounded-full p-5 w-16 h-16 flex items-center justify-center mx-auto">
                            <Crown className="text-white w-8 h-8" />
                          </div>
                          <div className="absolute -right-1 -top-1 bg-[#702cdd] rounded-full p-1 w-6 h-6 flex items-center justify-center">
                            <span className="text-white text-xs">
                              🔥
                            </span>
                          </div>
                        </div>
        
                        {/* Modal Text */}
                        <h2 className="text-white text-xl font-bold mb-1">Start Scanning your Beats</h2>
                        <p className="text-purple-400  mb-3">for only $5</p>
                        <p className="text-gray-400 text-sm mb-6">
                          Find out if someone is using your beats without permission.
                        </p>
        
                        {/* Pricing Info Box */}
                        <div className="bg-[#282133] bg-opacity-40 rounded-lg p-3 mb-6">
                          <div className="flex items-start mb-2">
                            <div className="flex-shrink-0 mr-2 mt-1">
                              <div className="bg-purple-600 w-4 h-4 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            </div>
                            <div className="text-left">
                              <p className="text-[#7c3aed] text-sm">Today: <span className="text-gray-300">Pay only $5 to upgrade to Ultra Plan</span></p>
                            </div>
                          </div>
                          <div className="text-left pl-6">
                            <p className="text-gray-400 text-xs">Next billing cycle: <span className="text-gray-300">Your subscription will automatically renew at $14.99/month on ({dateOnly}) with all Ultra Plan features.</span></p>
                          </div>
                        </div>
        
                        {/* Buttons */}
                        <button 
                          className="w-full bg-[#702cdd] text-white py-3 rounded-lg font-medium mb-3"
                          onClick={() =>navigate("/upgrade/payment")}
                        >
                          Upgrade Now
                        </button>
                        <button 
                          className="w-full bg-gray-800 text-gray-400 py-3 rounded-lg font-medium"
                          onClick={() => navigate("/dashboard")}
                        >
                          Maybe Later
                        </button>
                      </div>
                    </div>
    );
};

export default Addon;