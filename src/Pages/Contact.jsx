import React, { useState } from "react";
import axiosInstance from "../Axios/AxiosInstance";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.issue) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/support/create", formData);
      toast.success(response.data.message);

      // Clear the form fields on success
      setFormData({
        name: "",
        email: "",
        issue: "",
      });
    } catch (error) {
      toast.error("Failed to submit support request.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-16 pb-8">
      <div className="bg-[#0f0f0f] p-6 md:p-20 rounded-lg">
        <h1 className="text-4xl font-bold text-[#b079e9] text-center">
          Contact Support
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
          {/* Name */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>

          {/* Issue */}
          <div>
            <label className="block text-[#9da6be] text-sm font-medium mb-2">
              Issue
            </label>
            <textarea
              name="issue"
              placeholder="Describe your issue"
              value={formData.issue}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
              rows="5"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="primary-bg text-white font-bold px-8 py-3 rounded-lg hover:bg-purple-700 transition active:scale-95"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
