import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axiosInstance from "../../Axios/AxiosInstance";
import { FaMoneyCheckAlt } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(30); 

  const fetchTransactions = async (currentPage) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/AllTransections", {
        params: {
          page: currentPage,
          limit,
        },
      });
      setTransactions(response.data.data);
      setMeta(response.data.meta);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1); 
  };

  const getMethodColor = (method) => {
    switch (method) {
      case "subscription":
        return "text-green-500";
      case "extracredit":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4 bg-[#212529] rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          <span className="flex items-center gap-2 text-white">
            <span className="text-green-500">
              <FaMoneyCheckAlt />
            </span>{" "}
            Transactions
          </span>
        </h1>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto rounded-lg shadow-md">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-zinc-800">
              <thead className="bg-[#212529]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                    User Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                    Credit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                    Customer ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-[#1a1d21]">
                {loading && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-4 text-center text-white"
                    >
                      <Loading/>
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-4 text-center text-red-500"
                    >
                      Error: {error}
                    </td>
                  </tr>
                )}
                {!loading && transactions.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-4 text-center text-white"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  transactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="hover:bg-zinc-800 even:bg-[#212529] transition-colors"
                    >
                      <td className="px-4 py-4 text-white">
                        {transaction._id}
                      </td>
                      <td className="px-4 py-4 text-white">
                        {transaction.userNAme || ""}
                      </td>
                      <td className="px-4 py-4 text-zinc-300">
                        {transaction.userEmail || ""}
                      </td>
                      <td className="px-4 py-4 text-zinc-300">
                        {transaction.credit}
                      </td>
                      <td className="px-4 py-4 text-zinc-300">
                        {transaction.customerId}
                      </td>
                      <td
                        className={`px-4 py-4 font-bold ${getMethodColor(
                          transaction.method
                        )}`}
                      >
                        {transaction.method}
                      </td>
                      <td className="px-4 py-4 text-zinc-300">
                        {transaction.amount}$
                      </td>
                      <td className="px-4 py-4 text-zinc-300">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={meta.totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"flex justify-end mt-4 space-x-4"}
        activeClassName={"font-bold bg-violet-600/20"}
        pageClassName={"px-3 py-1 border border-zinc-600 rounded text-white"}
        previousClassName={
          "px-3 py-1 border border-zinc-600 rounded text-white"
        }
        nextClassName={"px-3 py-1 border border-zinc-600 rounded text-white"}
        breakClassName={"px-3 py-1 text-zinc-400"}
      />
      </div>
    </div>
  );
};

export default Transactions;
