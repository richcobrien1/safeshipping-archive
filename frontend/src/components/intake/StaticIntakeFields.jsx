// frontend/src/components/intake/StaticIntakeFields.jsx
// StaticIntakeFields — Standalone block for rendering constant intake fields
// Handles origin, destination, weight, and insurance with proper i18n integration

import React from 'react';
import { TextField, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useAuth } from '../../auth/AuthContext';
import { t } from '../../locales/index';

const StaticIntakeFields = ({ formData, setFormData }) => {
  const { language } = useAuth();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          label={t('intake.label.originPostal', language)}
          placeholder={t('intake.placeholder.originPostal', language)}
          variant="filled"
          fullWidth
          value={formData.origin || ''}
          onChange={(e) => updateField('origin', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label={t('intake.label.destinationPostal', language)}
          placeholder={t('intake.placeholder.destinationPostal', language)}
          variant="filled"
          fullWidth
          value={formData.destination || ''}
          onChange={(e) => updateField('destination', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label={t('intake.label.weight', language)}
          placeholder={t('intake.placeholder.weight', language)}
          variant="filled"
          fullWidth
          value={formData.weight || ''}
          onChange={(e) => updateField('weight', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          label={t('intake.label.insurance', language)}
          control={
            <Checkbox
              checked={formData.insurance || false}
              onChange={(e) => updateField('insurance', e.target.checked)}
            />
          }
          sx={{ color: '#80deea', mt: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default StaticIntakeFields;
