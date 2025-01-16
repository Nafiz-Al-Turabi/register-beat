import React from 'react';

const UserDetails = () => {
    // Mock user data
    const user = {
        name: "Tohidul",
        email: "tohidulalam9674@gmail.com",
        role: "admin",
        country: "Bangladesh",
        credit: 110,
        blacklist: true,
        active: true,
        subscriptionEndDate: "2025-02-11T04:53:32.682Z",
        createdAt: "2025-01-12T04:46:06.385Z",
        avatar: "1736660336445-Screenshot (2).png",
    };

    return (
        <div className="flex items-center justify-center py-10">
            <div className="bg-[#212529] shadow-lg rounded-lg p-6  w-full">
                <div className="flex items-center space-x-4">
                    <img
                        src={`https://your-cdn-path/${user.avatar}`}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{user.name || "No Name"}</h2>
                        <p className="text-sm text-gray-500">Role: {user.role}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-white font-medium">Email:</span>
                        <span className="text-white">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-white font-medium">Country:</span>
                        <span className="text-white">{user.country}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-white font-medium">Credit:</span>
                        <span className="text-white">{user.credit}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-white font-medium">Subscription Ends:</span>
                        <span className="text-white">
                            {new Date(user.subscriptionEndDate).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-white font-medium">Account Status:</span>
                        <span className={`text-sm font-semibold ${user.active ? 'text-green-500' : 'text-red-500'}`}>
                            {user.active ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-white font-medium">Blacklist:</span>
                        <span className={`text-sm font-semibold ${user.blacklist ? 'text-red-500' : 'text-green-500'}`}>
                            {user.blacklist ? "Blacklisted" : "Not Blacklisted"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
