import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react"; 
import SubmitButton from "@/components/submit-button";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchUsers(token);
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleDelete = async (email) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/users/delete?email=${email}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.email !== email));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditedName(user.name);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: editUser.email, name: editedName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      setUsers(users.map((user) => (user.email === editUser.email ? { ...user, name: editedName } : user)));
      setEditUser(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (loading) return <div className="text-center py-10 text-lg font-semibold">Loading...</div>;

  return (
    <div className="min-h-full flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white text-left">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.email} className={`text-gray-800 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {editUser && (
        <div className="fixed inset-0 flex justify-center items-center p-4 bg-gray-300/30 backdrop-blur-md">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit User</h2>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
            />
            <div className="flex justify-end gap-2 mt-4">
              <SubmitButton onClick={handleSave}>Save</SubmitButton>
              <button
                onClick={() => setEditUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
