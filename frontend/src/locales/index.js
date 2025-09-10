// File: src/locales/index.js — Handles key-based translation lookups across supported locales with fallback and debug logging

import en from './en.json';
import es from './es.json';
import ja from './ja.json';

const translations = {
  en,
  es,
  ja,
};

export const t = (key, locale = 'en', opts = {}) => {
  if (!key || typeof key !== 'string') {
    console.warn(`[i18n] Invalid translation key:`, key);
    return `[missing key]`;
  }

  const keys = key.split('.');
  const valueMap = translations[locale] || translations.en;

  let value = valueMap;
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      console.warn(`[i18n] Missing key: ${key} (failed at '${k}') in locale: ${locale}`);
      return `[missing: ${key}]`;
    }
  }

  const { returnObjects = false } = opts;

  // Return full object if requested, otherwise sanitize output
  if (returnObjects && typeof value === 'object') return value;
  if (typeof value === 'string') return value;

  return `[missing: ${key}]`;
};
