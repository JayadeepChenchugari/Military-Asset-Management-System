import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Assignments.css';
import api from '../api';
const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ asset: '', personnelName: '', quantity: 0, base: '' });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await api.get('/assignments');

    setAssignments(res.data);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Basic validation
  if (
    !newAssignment.asset ||
    !newAssignment.personnelName ||
    !newAssignment.base ||
    newAssignment.quantity <= 0
  ) {
    alert('Please fill in all fields correctly.');
    return;
  }

  // ✅ Add date to the payload
  const assignmentToSend = {
    ...newAssignment,
    date: new Date().toISOString()
  };

  try {
    await api.post('/assignments', assignmentToSend); // ✅ send to API
    fetchAssignments(); // ✅ refresh list
  } catch (err) {
    console.error("Assignment submission failed:", err.response?.data || err.message);
    alert("Assignment failed: " + (err.response?.data?.message || err.message));
  }
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Assignments</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input placeholder="Asset ID" value={newAssignment.asset} onChange={(e) => setNewAssignment({ ...newAssignment, asset: e.target.value })} />
        <input placeholder="Personnel Name" value={newAssignment.personnelName} onChange={(e) => setNewAssignment({ ...newAssignment, personnelName: e.target.value })} />
        <input placeholder="Quantity" type="number" value={newAssignment.quantity} onChange={(e) => setNewAssignment({ ...newAssignment, quantity: e.target.value })} />
        <input placeholder="Base ID" value={newAssignment.base} onChange={(e) => setNewAssignment({ ...newAssignment, base: e.target.value })} />
        <button type="submit">Assign</button>
      </form>
      <ul>
  {assignments.map((a) => (
    <li key={a._id}>
      {a.asset?.name || 'Unknown Asset'} - {a.quantity} to {a.personnelName}
    </li>
  ))}
</ul>

    </div>
  );
};

export default Assignments;
