import React, { useState, useEffect } from 'react';
import api from '../api';
import './Assets.css';

const Assets = () => {
  const [filters, setFilters] = useState({
    date: '',
    base: 'All Bases',
    type: 'All Types'
  });
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newAsset, setNewAsset] = useState({
    name: '',
    type: 'Select',
    quantity: 0,
    base: ''
  });

  const [editingAssetId, setEditingAssetId] = useState(null);
  const [editedAsset, setEditedAsset] = useState({});

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await api.get('/assets');
      setAssets(res.data);
    } catch (err) {
      setError('Failed to load assets');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewAssetChange = (e) => {
    const { name, value } = e.target;
    setNewAsset((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAsset = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/assets', newAsset);
      setAssets((prev) => [...prev, res.data]);
      setNewAsset({ name: '', type: 'Select', quantity: 0, base: '' });
    } catch (err) {
      alert('Failed to add asset');
    }
  };

  const handleEditClick = (asset) => {
    setEditingAssetId(asset._id);
    setEditedAsset({ ...asset });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedAsset((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const res = await api.put(`/assets/${editingAssetId}`, editedAsset);
      setAssets((prev) =>
        prev.map((a) => (a._id === editingAssetId ? res.data : a))
      );
      setEditingAssetId(null);
      setEditedAsset({});
    } catch (err) {
      alert('Failed to update asset');
    }
  };

  const handleCancelEdit = () => {
    setEditingAssetId(null);
    setEditedAsset({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    try {
      await api.delete(`/assets/${id}`);
      setAssets((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert('Failed to delete asset');
    }
  };

  const filteredAssets = assets.filter((asset) => {
    return (
      (filters.base === 'All Bases' || asset.base?.name === filters.base) &&
      (filters.type === 'All Types' || asset.type === filters.type)
    );
  });

  if (loading) return <p className="main-content">Loading assets...</p>;
  if (error) return <p className="main-content">{error}</p>;

  return (
    <div className="main-content">
      <h1>Assets</h1>

      {/* Add Asset Form */}
      <form className="add-asset-form" onSubmit={handleAddAsset}>
        <input
          type="text"
          name="name"
          placeholder="Asset Name"
          value={newAsset.name}
          onChange={handleNewAssetChange}
          required
        />
        <select name="type" value={newAsset.type} onChange={handleNewAssetChange}>
          <option value="Select">Select</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Weapon">Weapon</option>
          <option value="Ammunition">Ammunition</option>
        </select>
        <input
          type="number"
          name="quantity"
          min="1"
          value={newAsset.quantity}
          onChange={handleNewAssetChange}
        />
        <input
          type="text"
          name="base"
          placeholder="Base ID"
          value={newAsset.base}
          onChange={handleNewAssetChange}
          required
        />
        <button type="submit">Add Asset</button>
      </form>

      {/* Filters */}
      <div className="filter-container">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <select name="base" value={filters.base} onChange={handleFilterChange} className="filter-select">
          <option>All Bases</option>
          <option>Alpha Base</option>
          <option>Bravo Base</option>
          <option>Charlie Base</option>
          <option>Delta Outpost</option>
          <option>Echo Command Center</option>
        </select>
        <select name="type" value={filters.type} onChange={handleFilterChange} className="filter-select">
          <option>All Types</option>
          <option>Vehicle</option>
          <option>Weapon</option>
          <option>Ammunition</option>
        </select>
      </div>

      {/* Table */}
      <table className="asset-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Base</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset) =>
            editingAssetId === asset._id ? (
              <tr key={asset._id}>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={editedAsset.name}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <select
                    name="type"
                    value={editedAsset.type}
                    onChange={handleEditChange}
                  >
                    <option value="Vehicle">Vehicle</option>
                    <option value="Weapon">Weapon</option>
                    <option value="Ammunition">Ammunition</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    value={editedAsset.quantity}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="base"
                    value={editedAsset.base}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={asset._id}>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.quantity}</td> 
                <td>{asset.base?.name || asset.base}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEditClick(asset)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(asset._id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Assets;
