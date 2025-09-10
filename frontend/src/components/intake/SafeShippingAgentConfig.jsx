// frontend/src/components/intake/SafeShippingAgentConfig.jsx
// SafeShippingAgentConfig — Configuration form for agent settings and permissions

import React, { useState, useEffect } from 'react';

const SafeShippingAgentConfig = () => {
  const [formData, setFormData] = useState({
    agentName: '',
    role: '',
    permissions: [],
    endpoint: ''
  });

  const [manifestJson, setManifestJson] = useState('{}');

  useEffect(() => {
    // Clean empty keys and stringify
    const payload = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== '' && !(Array.isArray(value) && value.length === 0)) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    setManifestJson(JSON.stringify(payload, null, 2));
  }, [formData]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <form>
        <input
          type="text"
          placeholder="Agent Name"
          value={formData.agentName}
          onChange={e => handleChange('agentName', e.target.value)}
        />
        <select value={formData.role} onChange={e => handleChange('role', e.target.value)}>
          <option value="">Select Role</option>
          <option value="dispatcher">Dispatcher</option>
          <option value="carrier">Carrier</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          placeholder="Endpoint URL"
          value={formData.endpoint}
          onChange={e => handleChange('endpoint', e.target.value)}
        />
        {/* Simulate multiselect permissions */}
        <fieldset>
          <legend>Permissions</legend>
          {['create-shipment', 'update-status', 'cancel-shipment'].map(p => (
            <label key={p}>
              <input
                type="checkbox"
                checked={formData.permissions.includes(p)}
                onChange={e =>
                  handleChange(
                    'permissions',
                    e.target.checked
                      ? [...formData.permissions, p]
                      : formData.permissions.filter(x => x !== p)
                  )
                }
              />
              {p}
            </label>
          ))}
        </fieldset>
      </form>

      <textarea
        value={manifestJson}
        readOnly
        rows={20}
        cols={50}
        style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: '1rem' }}
      />
    </div>
  );
};

export default SafeShippingAgentConfig;
