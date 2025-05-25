import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Logs.css';
import api from '../api';
const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res =await api.get('/logs');

    setLogs(res.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            [{new Date(log.date).toLocaleString()}] {log.action} by {log.performedBy?.username} - {log.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
