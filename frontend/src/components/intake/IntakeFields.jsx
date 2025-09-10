import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { t } from '../../locales/index';
import LocalizedDropdown from './LocalizedDropdown';

const IntakeFields = ({ role, userLocale, formData, setFormData, region }) => {
  const mode = formData.transportMode;

  // 🔍 Confirm locale presence
  console.log('🧊 IntakeFields loaded with locale:', userLocale);

  const update = (field) => (e) => {
    const value = e.target?.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validationRules = {
    origin: (v) => v?.trim() !== '',
    destination: (v) => v?.trim() !== '',
    weight: (v) => !isNaN(v) && Number(v) > 0,
    contract_hash: (v) => /^0x[a-fA-F0-9]{64}$/.test(v),
    rawManifest: (v) => v?.length > 0,
    insurance: (v) => typeof v === 'boolean',
  };

  const errorText = {
    origin: 'intake.errors.originRequired',
    destination: 'intake.errors.destinationRequired',
    weight: 'intake.errors.weightInvalid',
    contract_hash: 'intake.errors.contractHashInvalid',
    rawManifest: 'intake.errors.rawManifestMissing',
    insurance: 'intake.errors.insuranceMissing',
  };

  const roleConfig = {
    agent: ['origin', 'destination', 'weight', 'rawManifest', 'insurance'],
    field: ['origin', 'destination', 'priority', 'fragility'],
    ops: ['contract_hash', 'customs_clearance', 'carrier', 'transportMode']
  };

  const commonFields = {
    origin: {
      label: 'intake.label.origin',
      placeholder: 'intake.placeholder.origin',
    },
    destination: {
      label: 'intake.label.destination',
      placeholder: 'intake.placeholder.destination',
    },
    insurance: {
      label: 'intake.label.insurance',
      placeholder: 'intake.placeholder.insurance',
    },
    weight: {
      label: 'intake.label.weight',
      placeholder: 'intake.placeholder.weight',
    },
    rawManifest: {
      label: 'intake.field.rawManifest',
      placeholder: 'intake.placeholder.rawManifest',
      multiline: true,
      rows: 4,
    },
    priority: {
      label: 'intake.label.priority',
      placeholder: 'intake.placeholder.priority',
    },
    fragility: {
      label: 'intake.label.fragility',
    },
    transportMode: {
      dropdown: true,
      options: [
        { value: 'cargo', text: 'intake.transport.cargo' },
        { value: 'air', text: 'intake.transport.air' },
        { value: 'truck', text: 'intake.transport.truck' },
        { value: 'courier', text: 'intake.transport.courier' },
      ],
      label: 'intake.label.transportMode'
    },
    carrier: {
      label: 'intake.label.carrier',
      placeholder: 'intake.placeholder.carrier'
    },
    contract_hash: {
      label: 'intake.label.contractHash',
    },
    customs_clearance: {
      label: 'intake.label.customsStatus',
    }
  };

  const fields = roleConfig[role] || [];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {t('intake.section.shippingDetails', userLocale)}
      </Typography>

      {/* 🧪 Live Translation Test */}
      <Box sx={{ mb: 2, p: 1, backgroundColor: '#002f34', borderRadius: 2 }}>
        <Typography variant="body2" color="info.main">
          {`Live translation test [ES]: ${t('intake.label.origin', 'es')}`}
        </Typography>
        <Typography variant="body2" color="info.main">
          {`Live translation test [JA]: ${t('intake.label.origin', 'ja')}`}
        </Typography>
        <Typography variant="body2" color="info.main">
          {`Live translation test [EN]: ${t('intake.label.origin', 'en')}`}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {fields.map((key) => {
          const config = commonFields[key];
          if (!config) return null;

          // 🔍 Diagnostic logging per field
          console.log(`🧊 Rendering [${key}] →`, {
            label: t(config.label, userLocale),
            placeholder: t(config.placeholder, userLocale),
            helper: t(`intake.helper.${key}`, userLocale),
            value: formData[key],
          });

          const value = formData[key];
          const isError = validationRules[key] ? !validationRules[key](value) : false;

          if (config.dropdown) {
            return (
              <Box key={key} sx={{ flex: '1 1 300px' }}>
                <LocalizedDropdown
                  label={config.label}
                  options={config.options}
                  locale={userLocale}
                  value={value}
                  onChange={update(key)}
                />
              </Box>
            );
          }

          return (
            <Box key={key} sx={{ flex: '1 1 300px' }}>
              <TextField
                label={t(config.label, userLocale)}
                placeholder={config.placeholder ? t(config.placeholder, userLocale) : ''}
                variant="filled"
                fullWidth
                multiline={config.multiline}
                rows={config.rows}
                value={value || ''}
                onChange={update(key)}
                error={isError}
                helperText={
                  isError
                    ? t(errorText[key], userLocale)
                    : t(`intake.helper.${key}`, userLocale)
                }
                InputProps={{ disableUnderline: true }}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: 2,
                  input: { color: '#e0f7fa' },
                  label: { color: '#80deea' },
                  fontFamily: config.multiline ? 'monospace' : 'inherit',
                }}
              />
            </Box>
          );
        })}

        {(mode === 'air' || mode === 'truck' || mode === 'courier') && (
          <Box sx={{ flex: '1 1 300px' }}>
            <FormControlLabel
              label={t('intake.label.insurance', userLocale)}
              control={
                <Checkbox
                  checked={formData.insurance || false}
                  onChange={update('insurance')}
                  sx={{
                    color: '#e0f7fa',
                    '&.Mui-checked': { color: '#26c6da' },
                  }}
                />
              }
              sx={{ mt: 2, ml: 1, color: '#80deea' }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default IntakeFields;
