// src/utils/audit/AuditTrailLogger.js
// This module provides a function to log user actions for audit trails.
// Use: import { fetch } from 'node-fetch';

export const logUserAction = ({ source, role, timestamp, action }) => {
  const auditPayload = {
    source,
    role,
    timestamp: timestamp.toISOString(),
    action,
  };
  return fetch('/api/audit', {
    method: 'POST',
    body: JSON.stringify(auditPayload),
    headers: { 'Content-Type': 'application/json' },
  });
};
