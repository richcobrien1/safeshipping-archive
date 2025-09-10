// frontend/src/components/intake/AgentIntakePanel.jsx
// AgentIntakePanel — Manual intake view for agent-led entry and manifest paste
// Includes cleaned layout with one transport dropdown and restored carrier dropdown

import React, { useState, useContext, useEffect } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Divider,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { t } from '../../locales/index';
import { UserContext } from '../../context/UserProvider';
import CryoFeedback from './CryoFeedback';

const transportModes = [
  { value: 'cargo', labelKey: 'intake.transport.cargo' },
  { value: 'air', labelKey: 'intake.transport.air' },
  { value: 'truck', labelKey: 'intake.transport.truck' },
  { value: 'courier', labelKey: 'intake.transport.courier' },
];

const carrierOptions = ['DHL', 'FedEx', 'Maersk', 'UPS'];

const AgentIntakePanel = () => {
  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  const [formData, setFormData] = useState({
    // AgentIntakePanel base fields
    origin: '',
    destination: '',
    weight: '',
    insurance: false,
    carrier: '',
    transportMode: '',
    manifest: '',

    // Sender phase
    sender: '',
    contents: '',
    fragility: '',
    departure_location: '',
    departure_time: '',
    status_dispatch: '',
    contract_hash: '',

    // Transit phase
    priority: '',
    status_transit: '',

    // Customs phase
    customs_clearance: '',

    // Delivery phase
    receiver: '',
    arrival_location: '',
    arrival_time: '',
    status_delivery: ''
  });
  const [compiledManifest, setCompiledManifest] = useState('{}');
  const [response, setResponse] = useState(null);

  const { userLocale: language } = useContext(UserContext);

  const updateField = (field, value) => {
    const next = { ...formData, [field]: value };

    // Build updated manifest directly
    const manifestPayload = Object.entries(next).reduce((acc, [key, val]) => {
      if (key !== 'manifest') {
        const valid = Array.isArray(val) ? val.length > 0 : val !== '';
        if (valid) acc[key] = val;
      }
      return acc;
    }, {});

    setFormData({
      ...next,
      manifest: JSON.stringify(manifestPayload, null, 2)
    });
  };

  useEffect(() => {
    const filteredData = Object.entries(formData).reduce((acc, [key, value]) => {
      const valid = Array.isArray(value) ? value.length > 0 : value !== '';
      if (valid && key !== 'manifest') {
        acc[key] = value;
      }
      return acc;
    }, {});
    setCompiledManifest(JSON.stringify(filteredData, null, 2));
  }, [formData]);

  const handleSubmit = () => {
    setFeedbackStatus('pending');
    try {
      const parsed = JSON.parse(formData.manifest);
      setTimeout(() => {
        setResponse({ status: 'success', carrier: parsed.carrier });
        setFeedbackStatus('success');
      }, 1200);
    } catch {
      setResponse({ status: 'error', message: 'Invalid JSON' });
      setFeedbackStatus('error');
    }
  };

  return (
    <Box sx={{ px: 4, py: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t('intake.panel.title', language)}
      </Typography>

      <Divider sx={{ mb: 3, borderColor: 'aqua' }} />

      {/* 🚚 Section: Shipping Details */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {t('intake.section.shippingDetails', language)}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label={t('intake.label.originPostal', language)}
            placeholder={t('intake.placeholder.originPostal', language)}
            variant="filled"
            fullWidth
            value={formData.origin}
            onChange={(e) => updateField('origin', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={t('intake.label.destinationPostal', language)}
            placeholder={t('intake.placeholder.destinationPostal', language)}
            variant="filled"
            fullWidth
            value={formData.destination}
            onChange={(e) => updateField('destination', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={t('intake.label.weight', language)}
            placeholder={t('intake.placeholder.weight', language)}
            variant="filled"
            fullWidth
            value={formData.weight}
            onChange={(e) => updateField('weight', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            label={t('intake.label.insurance', language)}
            control={
              <Checkbox
                checked={formData.insurance}
                onChange={(e) => updateField('insurance', e.target.checked)}
              />
            }
            sx={{ color: '#80deea', mt: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={formData.carrier}
            onChange={(e) => updateField('carrier', e.target.value)}
            fullWidth
            variant="filled"
            displayEmpty
          >
            <MenuItem value="" disabled>
              {t('intake.label.carrier', language)}
            </MenuItem>
            {carrierOptions.map((carrier) => (
              <MenuItem key={carrier} value={carrier}>
                {t(`intake.carrier.${carrier}`, language)}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={formData.transportMode}
            onChange={(e) => updateField('transportMode', e.target.value)}
            fullWidth
            variant="filled"
            displayEmpty
          >
            <MenuItem value="" disabled>
              {t('intake.label.transportMode', language)}
            </MenuItem>
            {transportModes.map(({ value, labelKey }) => (
              <MenuItem key={value} value={value}>
                {t(labelKey, language)}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Divider sx={{ my: 5, borderColor: 'aqua' }} />

      {/* 🔧 Live JSON Manifest Panel */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {t('intake.section.liveManifestBuilder', language)}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
          <TextField
            label={t('intake.field.generatedManifest', language)}
            multiline
            rows={10}
            fullWidth
            variant="filled"
            value={compiledManifest}
            InputProps={{ readOnly: true, disableUnderline: true }}
            sx={{
              fontFamily: 'monospace',
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: 2,
              input: { color: '#e0f7fa' },
              label: { color: '#4dd0e1' },
            }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3, mt: 5, borderColor: 'aqua' }} />

      {/* 📋 Section: Manifest Paste */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {t('intake.section.manifestPaste', language)}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
        <TextareaAutosize
          value={apiPayload}
          onChange={handleManifestPaste}
          minRows={6}
          maxRows={20}
          style={{
            width: '100%',
            resize: 'none',
            fontFamily: 'monospace',
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderRadius: '8px',
            border: 'none',
            padding: '1rem',
            color: '#e0f7fa',
            boxSizing: 'border-box'
          }}
        />
        </Grid>
        <Grid item xs={12} md={8}>
          <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            {t('intake.actions.submitOrder', language)}
          </Button>
        </Grid>
      </Grid>

      {/* 🧊 Response Feedback */}
      <Box sx={{ mt: 4 }}>
        {response && (
          <CryoFeedback
            status={response.status}
            emoji={response.status === 'success' ? '📦' : '❌'}
            animation={response.status === 'success' ? 'bounce' : 'shake'}
            message={
              response.status === 'success'
                ? `${t('intake.response.carrier', language)}: ${response.carrier}`
                : `${t('intake.response.error', language)}: ${response.message}`
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default AgentIntakePanel;
