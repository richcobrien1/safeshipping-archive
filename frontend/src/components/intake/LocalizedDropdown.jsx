import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { t } from '../../locales';

const LocalizedDropdown = ({ label, options, locale, value, onChange }) => {
  const isStructuredOptions = options && !Array.isArray(options) && options.carriers;
  const items = isStructuredOptions ? options.carriers : options;

  const resolvedLabelKey = isStructuredOptions ? options.labelKey : label;
  const normalizedLabelKey =
    typeof resolvedLabelKey === 'string'
      ? resolvedLabelKey.includes('.')
        ? resolvedLabelKey
        : `intake.label.${resolvedLabelKey}`
      : '';

  const resolvedLabel =
    normalizedLabelKey ? t(normalizedLabelKey, locale) : String(resolvedLabelKey || '');

  return (
    <FormControl
      variant="filled"
      sx={{
        width: 280,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 2,
      }}
    >
      <InputLabel sx={{ color: '#80deea' }}>
        {resolvedLabel}
      </InputLabel>
      <Select
        value={value || ''}
        onChange={onChange}
        displayEmpty
        fullWidth
        variant="filled"
        sx={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          borderRadius: 2,
          color: '#e0f7fa',
          '& .MuiSelect-select': {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          '& .MuiInputBase-input': {
            width: '100%',
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: '0 0 4px 4px',
              backgroundColor: 'rgba(0,50,70,0.85)',
              color: '#e0f7fa',
            }
          },
        }}
      >
        {items.map((opt, i) => {
          const value = typeof opt === 'string' ? opt : opt?.value;
          let labelKey = typeof opt === 'string' ? opt : opt?.text;

          if (
            labelKey &&
            typeof labelKey === 'object' &&
            typeof labelKey.labelKey === 'string'
          ) {
            labelKey = labelKey.labelKey;
          }

          const resolvedKey = String(labelKey || '');
          const translated = t(resolvedKey, locale);

          return (
            <MenuItem key={i} value={value}>
              {translated}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default LocalizedDropdown;
