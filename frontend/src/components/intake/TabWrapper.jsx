// src/components/intake/TabWrapper.jsx
// This component provides a tabbed interface for switching between API feed and manual entry forms.
// Use: <TabWrapper defaultTab="API">...</TabWrapper>

import React from 'react';

const TabWrapper = ({ defaultTab, children }) => {
  return (
    <div className="tab-wrapper">
      <nav className="tab-nav">
        {/* <button className={defaultTab === 'API' ? 'active' : ''}>📥 API Feed</button>
        <button className={defaultTab === 'Manual' ? 'active' : ''}>✍️ Manual Entry</button> */}
      </nav>
      <div className="tab-content">
        {children}
      </div>
    </div>
  );
};

export default TabWrapper;
