import React, { useState, useEffect } from 'react';
import api from '../api';
import './Transfers.css';

const Transfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [bases, setBases] = useState([]);
  const [newTransfer, setNewTransfer] = useState({
    asset: '',
    quantity: 'Quantity',
    fromBase: '',
    toBase: ''
  });

  useEffect(() => {
    fetchTransfers();
    fetchAssets();
    fetchBases();
  }, []);

  const fetchTransfers = async () => {
    const res = await api.get('/transfers');
    setTransfers(res.data);
  };

  const fetchAssets = async () => {
    const res = await api.get('/assets');
    setAssets(res.data);
  };

  const fetchBases = async () => {
    const res = await api.get('/bases');
    setBases(res.data);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post('/transfers', newTransfer);
    setNewTransfer({ asset: '', quantity: 0, fromBase: '', toBase: '' });
    fetchTransfers();
  } catch (error) {
    console.error('Transfer failed:', error);
    alert(error?.response?.data?.message || 'Transfer failed.');
  }
};


  return (
    <div className="transfers-container">
      <h2>Asset Transfers</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={newTransfer.asset}
          onChange={(e) => setNewTransfer({ ...newTransfer, asset: e.target.value })}
          required
        >
          <option value="">Select Asset</option>
          {assets.map(asset => (
            <option key={asset._id} value={asset._id}>{asset.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={newTransfer.quantity}
          onChange={(e) => setNewTransfer({ ...newTransfer, quantity: e.target.value })}
          required
        />

        <select
          value={newTransfer.fromBase}
          onChange={(e) => setNewTransfer({ ...newTransfer, fromBase: e.target.value })}
          required
        >
          <option value="">From Base</option>
          {bases.map(base => (
            <option key={base._id} value={base._id}>{base.name}</option>
          ))}
        </select>

        <select
          value={newTransfer.toBase}
          onChange={(e) => setNewTransfer({ ...newTransfer, toBase: e.target.value })}
          required
        >
          <option value="">To Base</option>
          {bases.map(base => (
            <option key={base._id} value={base._id}>{base.name}</option>
          ))}
        </select>

        <button type="submit">Transfer</button>
      </form>

      <h3>Transfer History</h3>
      <ul>
        {transfers.map(t => (
          <li key={t._id}>
            <strong>{t.asset?.name || 'Unknown Asset'}</strong> — {t.quantity} units
            <br />
            From: {t.fromBase?.name || 'Unknown Base'} → To: {t.toBase?.name || 'Unknown Base'}
            <br />
            <small>Time: {new Date(t.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transfers;
