import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role }) => {
  console.log("Sidebar role:", role);
  const getLinkClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <aside className="sidebar">
      <ul>
        <li><NavLink to="/dashboard" end className={getLinkClass}>Dashboard</NavLink></li>
 
        {role === 'Admin' && (
  <li><NavLink to="/users" end className={getLinkClass}>Users</NavLink></li>
)}

{(role === 'Admin' ) && (
  <li><NavLink to="/assets" className={getLinkClass}>Assets</NavLink></li>
)}

{(role === 'Admin' || role === 'LogisticsOfficer') && (
  <>
    <li><NavLink to="/purchases" className={getLinkClass}>Purchases</NavLink></li>
    <li><NavLink to="/transfers" className={getLinkClass}>Transfers</NavLink></li>
  </>
)}

{(role === 'Admin' || role === 'BaseCommander') && (
  <>
    <li><NavLink to="/assignments" className={getLinkClass}>Assignments</NavLink></li>
    <li><NavLink to="/expenditures" className={getLinkClass}>Expenditures</NavLink></li>
  </>
)}

{role === 'Admin' && (
  <li><NavLink to="/logs" className={getLinkClass}>Logs</NavLink></li>
)}

      </ul>
    </aside>
  );
};


export default Sidebar;
