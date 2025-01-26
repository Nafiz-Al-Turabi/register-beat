import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../Axios/AxiosInstance';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import moment from 'moment';
import { AuthContext } from '../../Provider/AuthProvider';

const SearchBeat = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    console.log("ssssss", query)
    const {user} = useContext(AuthContext)

    const { data: beats = [], isLoading, error } = useQuery({
        queryKey: ['beats', query, user?._id],
        queryFn: async () => {
            try {
                console.log("fsdfsdfsdfsfd")
                const response = await axiosInstance.get(`/admin/search/${user?._id}`, {
                    params: { query },
                });
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error(error);
                throw new Error('Failed to fetch beats');
            }
        },
        enabled: !!query,
    });

    if (isLoading) return <Loading />;
    if (error) return <div className="text-red-500 text-center p-4">{error.message}</div>;
    if (!beats?.length) return <div className="text-white text-center p-4">No beats found</div>;

    return (
        <div>
            <div className="overflow-x-auto md:w-full">
                <table className="min-w-full border-collapse">
                    <thead className='border-b-2 border-gray-700 text-[#a1afc5]'>
                        <tr>
                            <th className="p-4 text-left">Beat Name</th>
                            <th className="p-4 text-left">Registration ID</th>
                            <th className="p-4 text-left">Registration Date</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y-[1px] divide-[#2d344b] text-white'>
                        {beats?.map((beat) => (
                            <tr key={beat?._id}>
                                <td className="p-4 font-medium">{beat?.beatName}</td>
                                <td className="py-5">
                                    <span className="bg-purple-800 text-white px-3 py-1 rounded-full text-sm">
                                        {beat?.registrasionId}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {moment(beat?.updatedAt).format('MMMM Do YYYY')}
                                </td>
                                <td className="p-4">
                                    <button className="bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-sm">
                                        View Certificate
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

export default SearchBeat;
