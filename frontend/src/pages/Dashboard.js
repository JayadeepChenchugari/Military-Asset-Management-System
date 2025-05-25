import React, { useEffect, useState } from "react";
import axios from "../api";
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [baseOptions, setBaseOptions] = useState([]);
  const [filters, setFilters] = useState({ base: "", equipmentType: "", date: "" });
  const [showNetMovementDetails, setShowNetMovementDetails] = useState(false);
  const [netMovementDetails, setNetMovementDetails] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, [filters]);

  useEffect(() => {
    fetchBaseOptions();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/dashboard", { params: filters });
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  const fetchBaseOptions = async () => {
    try {
      const response = await axios.get("/bases");
      setBaseOptions(response.data);
    } catch (error) {
      console.error("Error fetching base options", error);
    }
  };

  const fetchNetMovementDetails = async () => {
    try {
      const response = await axios.get("/dashboard/net-movement-details", { params: filters });
      setNetMovementDetails(response.data);
      setShowNetMovementDetails(true);
    } catch (error) {
      console.error("Error fetching net movement details", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="filters">
        <label>
          Base:
          <select name="base" value={filters.base} onChange={handleFilterChange}>
            <option value="">All Bases</option>
            {baseOptions.map((base) => (
              <option key={base._id} value={base._id}>
                {base.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Equipment Type:
          <input
            type="text"
            name="equipmentType"
            value={filters.equipmentType}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      {dashboardData ? (
        <div className="metrics">
          <div className="card">
            <h3>Opening Balance</h3>
            <p>{dashboardData.openingBalance}</p>
          </div>
          <div className="card">
            <h3>Closing Balance</h3>
            <p>{dashboardData.closingBalance}</p>
          </div>
          <div className="card clickable" onClick={fetchNetMovementDetails}>
            <h3>Net Movement</h3>
            <p>{dashboardData.netMovement}</p>
          </div>
          <div className="card">
            <h3>Assigned</h3>
            <p>{dashboardData.assigned}</p>
          </div>
          <div className="card">
            <h3>Expended</h3>
            <p>{dashboardData.expended}</p>
          </div>
        </div>
      ) : (
        <p>Loading dashboard data...</p>
      )}

      {/* Modal for Net Movement Details */}
      {showNetMovementDetails && (
        <div className="modal-overlay" onClick={() => setShowNetMovementDetails(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Net Movement Breakdown</h3>
            <ul>
              <li>Purchases: {netMovementDetails?.purchases}</li>
              <li>Transfers In: {netMovementDetails?.transferIn}</li>
              <li>Transfers Out: {netMovementDetails?.transferOut}</li>
            </ul>
            <button onClick={() => setShowNetMovementDetails(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
