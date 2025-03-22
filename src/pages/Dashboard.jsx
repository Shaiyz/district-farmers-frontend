import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CustomerTable from "../components/CustomerTable";
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const syncToZoho = async (e) => {
    e.preventDefault(); 
    setSyncing(true);
    try {
      await axios.post("/sync-to-zoho", { customers });
      alert("Data synced to Zoho successfully!");
    } catch (error) {
      console.error("Zoho Sync Error:", error);
      alert("Failed to sync data to Zoho.");
    } finally {
      setSyncing(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customer Dashboard</h1>
      <h1>Hi, {user ? user.username : "Guest"}</h1>

      <div className="flex items-center justify-between mb-4">
        <Link to="/form" className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
          Add Customer
        </Link>
        <button 
          onClick={syncToZoho}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:bg-gray-400"
          disabled={syncing}
        >
          {syncing ? "Syncing..." : "Sync to Zoho"}
        </button>
        <button 
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading customers...</p>
      ) : (
        <CustomerTable customers={customers} />
      )}
    </div>
  );
}