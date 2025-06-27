import React from 'react';

const TransactionsTable = ({ transactions }) => {
    return (
        <>
            {
                transactions?.map((transaction) => (<tr
                    key={transaction._id}
                    className="hover:bg-zinc-800 even:bg-[#212529] transition-colors"
                >
                    <td className="px-4 py-4 text-white">
                        {transaction?._id}
                    </td>
                    <td className="px-4 py-4 text-white">
                        {transaction?.userNAme || ''}
                    </td>
                    <td className="px-4 py-4 text-zinc-300">
                        {transaction?.userEmail || ''}
                    </td>
                    <td className="px-4 py-4 text-zinc-300">
                        {transaction?.credit}
                    </td>
                    <td className="px-4 py-4 text-zinc-300">
                        {transaction?.customerId}
                    </td>
                    <td
                        className={`px-4 py-4 font-bold `}
                    >
                        {transaction?.method}
                    </td>
                    <td className="px-4 py-4 text-zinc-300">
                        {transaction?.amount}$
                    </td>
                    <td className="px-4 py-4 text-zinc-300">
                        {new Date(transaction?.createdAt).toLocaleString()}
                    </td>
                </tr>))
            }
        </>
    );
};

export default TransactionsTable;