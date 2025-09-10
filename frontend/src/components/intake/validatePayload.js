// src/components/intake/validatePayload.js

export const validateShipmentPayload = (payload) => {
  try {
    const parsed = JSON.parse(payload);

    if (!parsed.carrier || typeof parsed.carrier !== 'string') {
      return { valid: false, message: 'Missing or invalid carrier field' };
    }

    if (!parsed.origin || !parsed.destination) {
      return { valid: false, message: 'Origin and destination are required' };
    }

    return { valid: true, data: parsed };
  } catch (error) {
    return { valid: false, message: 'Invalid JSON format' };
  }
};
