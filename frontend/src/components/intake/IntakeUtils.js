// frontend/src/components/intake/IntakeUtils.js

// 🔧 Role-based field layout
export const roleFieldConfig = {
  agent: ['origin', 'destination', 'weight', 'rawManifest'],
  field: ['origin', 'destination', 'priority', 'fragility'],
  ops: ['contract_hash', 'customs_clearance', 'carrier', 'transportMode']
};

// 🔍 Central validation rules
export const validationRules = {
  origin: (v) => typeof v === 'string' && v.trim() !== '',
  // origin: (v) => v?.trim() !== '',
  destination: (v) => v?.trim() !== '',
  weight: (v) => !isNaN(v) && Number(v) > 0,
  contract_hash: (v) => /^0x[a-fA-F0-9]{64}$/.test(v),
  rawManifest: (v) => v?.length > 0,
};

// 🗣️ Localized error message keys
export const errorMessages = {
  origin: 'intake.errors.originRequired',
  destination: 'intake.errors.destinationRequired',
  weight: 'intake.errors.weightInvalid',
  contract_hash: 'intake.errors.contractHashInvalid',
  rawManifest: 'intake.errors.rawManifestMissing',
};

// 🧪 Validate an entire form based on role
export function validateFormByRole(role, formData) {
  const fields = roleFieldConfig[role] || [];
  const errors = {};

  fields.forEach((key) => {
    const rule = validationRules[key];
    if (rule && !rule(formData[key])) {
      errors[key] = errorMessages[key] || 'Invalid input';
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// 🧬 Normalize dropdown label key based on type
export function resolveDropdownLabel(rawKey, category = '') {
  if (typeof rawKey !== 'string') return '';

  const base = rawKey.includes('.') ? rawKey : rawKey.trim();
  if (category === 'carrier') return `intake.carrier.${base}`;
  if (category === 'transport') return `intake.transport.${base}`;
  if (category === 'region') return `intake.region.${base}`;
  return base.includes('.') ? base : `intake.label.${base}`;
}

// 🗂️ Reshape dropdown options with translation keys
export function normalizeDropdownOptions(rawOptions, category = '') {
  if (!Array.isArray(rawOptions)) return [];

  return rawOptions.map((opt) => {
    const value = typeof opt === 'string' ? opt : opt?.value;
    let labelKey = typeof opt === 'string' ? opt : opt?.text || opt?.labelKey || value;

    if (typeof labelKey === 'object') labelKey = labelKey.labelKey;
    const resolved = resolveDropdownLabel(String(labelKey || ''), category);

    return { value, text: resolved };
  });
}
