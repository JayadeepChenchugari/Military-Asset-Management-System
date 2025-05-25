import React, { useState, useEffect } from 'react';
import api from '../api';
import './Purchases.css';

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [assets, setAssets] = useState([]);
  const [filters, setFilters] = useState({ date: '', type: 'All' });
  const [newPurchase, setNewPurchase] = useState({ asset: '', quantity: 0, base: '' });

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await api.get('/assets');
      setAssets(res.data);
    } catch (err) {
      console.error('Failed to fetch assets:', err);
    }
  };

  const fetchPurchases = async () => {
    try {
      const res = await api.get('/purchases');
      setPurchases(res.data);
    } catch (err) {
      console.error('Failed to fetch purchases:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/purchases', newPurchase);
      fetchPurchases();
      setNewPurchase({ asset: '', quantity: 0, base: '' });
    } catch (err) {
      console.error('Failed to create purchase:', err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getAssetType = (asset) => {
  if (!asset) return 'Unknown';

  // If populated
  if (typeof asset === 'object' && asset.type) return asset.type;

  // If ID, look it up in the assets list
  const found = assets.find((a) => a._id === asset || a._id === asset?.toString());
  return found ? found.type : 'Unknown';
};

const getAssetName = (asset) => {
  if (!asset) return 'Unknown';

  // If populated
  if (typeof asset === 'object' && asset.name) return asset.name;

  const found = assets.find((a) => a._id === asset || a._id === asset?.toString());
  return found ? found.name : 'Unknown';
};
  // Apply filters locally
  const filteredPurchases = purchases.filter((p) => {
    const matchesDate =
      !filters.date || new Date(p.date).toISOString().slice(0, 10) === filters.date;
    const matchesType =
      filters.type === 'All' || getAssetType(p.asset) === filters.type;
    return matchesDate && matchesType;
  });
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Purchases</h2>

      {/* Purchase Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <select
          value={newPurchase.asset}
          onChange={(e) => setNewPurchase({ ...newPurchase, asset: e.target.value })}
          required
        >
          <option value="">Select Asset</option>
          {assets.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option> 
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={newPurchase.quantity}
          onChange={(e) => setNewPurchase({ ...newPurchase, quantity: e.target.value })}
          required
        />
        <input
          placeholder="Base ID"
          value={newPurchase.base}
          onChange={(e) => setNewPurchase({ ...newPurchase, base: e.target.value })}
          required
        />
        <button type="submit">Add Purchase</button>
      </form>

      {/* Filters */}
      <div className="mb-4 space-x-2">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        <select name="type" value={filters.type} onChange={handleFilterChange}>
  <option>All</option>
  <option>Vehicle</option>
  <option>Weapon</option>
  <option>Ammunition</option>
</select>

      </div>

      {/* Purchase List */}
      <ul>
        {filteredPurchases.map((p) => (
          <li key={p._id}>
            {getAssetName(p.asset)} - {p.quantity} units on {new Date(p.date).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
