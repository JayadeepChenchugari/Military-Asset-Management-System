import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Expenditures.css';
import api from '../api';
const Expenditures = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [newExpenditure, setNewExpenditure] = useState({ asset: '', quantity: 0, base: '' });

  useEffect(() => {
    fetchExpenditures();
  }, []);

  const fetchExpenditures = async () => {
    const res =await api.get('/expenditures');

    setExpenditures(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/expenditures', newExpenditure);

    fetchExpenditures();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Expenditures</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input placeholder="Asset ID" value={newExpenditure.asset} onChange={(e) => setNewExpenditure({ ...newExpenditure, asset: e.target.value })} />
        <input placeholder="Quantity" type="number" value={newExpenditure.quantity} onChange={(e) => setNewExpenditure({ ...newExpenditure, quantity: e.target.value })} />
        <input placeholder="Base ID" value={newExpenditure.base} onChange={(e) => setNewExpenditure({ ...newExpenditure, base: e.target.value })} />
        <button type="submit" className="expenditures-button">Record</button>

      </form>
      <ul>
  {expenditures.map(e => (
    <li key={e._id}>
      {e.asset?.name || 'Unknown Asset'} - {e.quantity}
    </li>
  ))}
</ul>

    </div>
  );
};

export default Expenditures;
