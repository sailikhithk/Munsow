import React from 'react';
import './Card.css'; // Import your CSS file for styling

function Card({ data }) {
  return (
    <div className="card">
      <h2>{data.name}</h2>
      <div className="card-content">
        <div className="sub-value">
          <span className="sub-label">Active:</span>
          <span className="sub-number">{data.sub_values.active}</span>
        </div>
        <div className="sub-value">
          <span className="sub-label">Inactive:</span>
          <span className="sub-number">{data.sub_values.in_active_quiz}</span>
        </div>
      </div>
      <p className="main-value">{data.value}</p>
    </div>
  );
}

export default Card;
