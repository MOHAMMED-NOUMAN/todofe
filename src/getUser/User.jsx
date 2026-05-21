import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("[User] Fetching all users...");
    axios.get('/api/users')
      .then((response) => {
        console.log("[User] Fetched users:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('[User] Error fetching users:', error.response?.data || error.message);
      });
  }, []);

  const deleteUser = async (userId) => {

    try {

      console.log("[User] Deleting user with ID:", userId);
      const response = await axios.delete(
        `/api/remove/user/${userId}`
      );

      toast.success(response.data.message, {
        position: "top-center",
      });

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

    } catch (error) {

      console.error("Error deleting user:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errorMessage ||
        "Error deleting user";

      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="userTable p-10 flex flex-col mt-10 px-4">

      <Link to="/add">
        <button className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 flex items-center gap-2 font-medium">
          Add User
          <i className="fa-solid fa-user-plus text-sm"></i>
        </button>
      </Link>

      <table className="w-full max-w-6xl border border-gray-300 shadow-md rounded-lg overflow-hidden">

        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-4 text-left">S.No</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Phone</th>
            <th className="px-6 py-4 text-left">Address</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">

          {users.map((user, index) => (
            <tr
              key={user._id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="px-6 py-4">
                {index + 1}
              </td>

              <td className="px-6 py-4">
                {user.name}
              </td>

              <td className="px-6 py-4">
                {user.email}
              </td>

              <td className="px-6 py-4">
                {user.phone}
              </td>

              <td className="px-6 py-4">
                {user.address}
              </td>

              <td className="px-6 py-4">

                <div className="flex flex-col items-start gap-2">

                  <Link
                    to={`/update/${user._id}`}
                    className="text-blue-600 bg-blue-200 p-3 rounded hover:bg-blue-300"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-600 bg-red-200 p-3 rounded hover:bg-red-300"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>

                </div>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default User