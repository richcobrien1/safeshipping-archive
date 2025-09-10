// src/utils/intake/renderLocalizedDropdown.jsx

import React from 'react';
import LocalizedDropdown from '../../components/intake/LocalizedDropdown';

export const renderLocalizedDropdown = ({ label, options, locale, value, onChange }) => {
  const isCarrierDropdown = options?.carriers;
  const rawItems = isCarrierDropdown ? options.carriers : options;

  const items = rawItems.map((item) => {
    const val = typeof item === 'string' ? item : item?.value;

    let rawKey = '';
    if (typeof item === 'string') {
      rawKey = item;
    } else if (typeof item?.text === 'string') {
      rawKey = item.text;
    } else if (typeof item?.labelKey === 'string') {
      rawKey = item.labelKey;
    } else if (typeof item?.text?.labelKey === 'string') {
      rawKey = item.text.labelKey;
    } else {
      rawKey = String(item?.text || item?.value || '');
    }

    // 🧊 Prefix translation key based on dropdown category
    let translatedKey = '';
    if (rawKey.includes('.')) {
      translatedKey = rawKey;
    } else if (isCarrierDropdown) {
      translatedKey = `intake.carrier.${rawKey}`;
    } else if (['cargo', 'air', 'truck', 'courier'].includes(rawKey)) {
      translatedKey = `intake.transport.${rawKey}`;
    } else if (['NA', 'EU', 'APAC'].includes(rawKey)) {
      translatedKey = `intake.region.${rawKey}`;
    } else {
      translatedKey = rawKey;
    }

    return { value: val, text: translatedKey };
  });

  // 🈶 Label key resolution
  const labelKey =
    typeof options?.labelKey === 'string'
      ? options.labelKey
      : typeof label === 'string' && label.includes('.')
        ? label
        : `intake.label.${label}`;

  return (
    <LocalizedDropdown
      label={labelKey}
      options={items}
      locale={locale}
      value={value}
      onChange={onChange}
    />
  );
};
