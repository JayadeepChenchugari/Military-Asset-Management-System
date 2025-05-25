import React from 'react';
import './AssetList.css';

const AssetList = ({ assets }) => {
  return (
    <table className="asset-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Base</th>
        </tr>
      </thead>
      <tbody>
        {assets.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
              No assets found.
            </td>
          </tr>
        ) : (
          assets.map((asset, idx) => (
            <tr key={idx}>
              <td>{asset.name}</td>
              <td>{asset.type}</td>
              <td>{asset.quantity}</td>
              <td>{asset.status}</td>
              <td>{asset.base}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default AssetList;
