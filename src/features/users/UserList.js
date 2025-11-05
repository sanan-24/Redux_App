import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, addUser, deleteUser, updateUser } from "./userSlice";

export const UserList = () => {
const dispatch = useDispatch();
const { users, loading, error } = useSelector((state) => state.users);

const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });
const [editId, setEditId] = useState(null);
const [editData, setEditData] = useState({ name: "", email: "", age: "" });

useEffect(() => {
dispatch(fetchUsers());
}, [dispatch]);

const handleAdd = () => {
if (!newUser.name || !newUser.email || !newUser.age)
return alert("Please fill all fields!");
dispatch(addUser(newUser));
setNewUser({ name: "", email: "", age: "" });
};

const handleUpdate = (id) => {
dispatch(updateUser({ id, updatedUser: editData }));
setEditId(null);
};

if (loading) return <h3 className="text-center text-xl mt-10">Loading...</h3>;
if (error) return <h3 className="text-center text-red-500 mt-10">Error: {error}</h3>;

return ( <div className="max-w-3xl mx-auto p-6"> <h2 className="text-2xl font-bold text-center mb-6 text-red-500">User CRUD (Redux Toolkit)</h2>

  {/* Add User Form */}
  <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex flex-col sm:flex-row gap-3">
    <input
      type="text"
      placeholder="Name"
      value={newUser.name}
      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-blue-400"
    />
    <input
      type="email"
      placeholder="Email"
      value={newUser.email}
      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-blue-400"
    />
    <input
      type="number"
      placeholder="Age"
      value={newUser.age}
      onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
      className="border border-gray-300 rounded-md p-2 w-20 sm:w-24 focus:ring-2 focus:ring-blue-400"
    />
    <button
      onClick={handleAdd}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
    >
      Add
    </button>
  </div>

  {/* User List */}
  <ul className="space-y-3">
    {users.map((user) => (
      <li
        key={user.id}
        className="bg-white shadow-sm rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-100"
      >
        {editId === user.id ? (
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            <input
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="border p-2 rounded-md flex-1 focus:ring-2 focus:ring-blue-400"
            />
            <input
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              className="border p-2 rounded-md flex-1 focus:ring-2 focus:ring-blue-400"
            />
            <input
              value={editData.age}
              onChange={(e) => setEditData({ ...editData, age: e.target.value })}
              className="border p-2 rounded-md w-20 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="font-medium text-gray-800">{user.name}</span>
            <span className="text-gray-600">{user.email}</span>
            <span className="text-gray-500">{user.age} yrs</span>
          </div>
        )}

        <div className="flex gap-2">
          {editId === user.id ? (
            <>
              <button
                onClick={() => handleUpdate(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditId(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditId(user.id);
                  setEditData({
                    name: user.name,
                    email: user.email,
                    age: user.age,
                  });
                }}
                className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteUser(user.id))}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </li>
    ))}
  </ul>
</div>
);
};
