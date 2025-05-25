import React, { useState, useEffect } from 'react';
import api from '../api'; // your axios instance
import './Bases.css'; 
const Bases = () => {
  const [bases, setBases] = useState([]);
  const [newBase, setNewBase] = useState({ name: '', location: '', commander: '' });

  useEffect(() => {
    fetchBases();
  }, []);

  const fetchBases = async () => {
    try {
      const res = await api.get('/bases');
      setBases(res.data);
    } catch (err) {
      console.error('Failed to fetch bases:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bases', newBase);
      setNewBase({ name: '', location: '', commander: '' });
      fetchBases();
    } catch (err) {
      console.error('Failed to add base:', err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h2>Bases</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
        <input
          placeholder="Base Name"
          value={newBase.name}
          onChange={(e) => setNewBase({ ...newBase, name: e.target.value })}
          required
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          placeholder="Location"
          value={newBase.location}
          onChange={(e) => setNewBase({ ...newBase, location: e.target.value })}
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          placeholder="Commander ID (optional)"
          value={newBase.commander}
          onChange={(e) => setNewBase({ ...newBase, commander: e.target.value })}
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Add Base</button>
      </form>

      <ul>
        {bases.map((base) => (
          <li key={base._id}>
            <strong>{base.name}</strong> — {base.location || 'No location'} — Commander: {base.commander ? base.commander.name : 'None'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bases;
