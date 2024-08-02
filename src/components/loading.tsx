// components/Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner">Loading...</div>
    </div>
  );
};

export default Loading;
