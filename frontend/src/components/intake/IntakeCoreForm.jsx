// frontend/src/components/intake/IntakeCoreForm.jsx

import React from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { t } from '../../locales/index';
import { useAuth } from '../../auth/AuthContext';

const IntakeCoreForm = ({ formData, updateField }) => {
  const { language } = useAuth();
  const tr = (key) => t(key, language);

  const transportOptions = t('intake.transportOptions', language, { returnObjects: true }) || {};
  const carrierOptions = t('intake.carrierOptions', language, { returnObjects: true }) || {};

  return (
    <Box>
      {/* Sender & Dispatch Phase */}
      <Box sx={{ border: '2px solid aqua', p: 2, mb: 5 }}>
        <Typography variant="subtitle2" color="aqua" sx={{ mb: 2 }}>
          {tr('intake.section.senderDetails')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.sender')} placeholder={tr('intake.placeholder.sender')} variant="filled" fullWidth value={formData.sender || ''} onChange={(e) => updateField('sender', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.contents')} placeholder={tr('intake.placeholder.contents')} variant="filled" fullWidth value={formData.contents || ''} onChange={(e) => updateField('contents', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.fragility')} placeholder={tr('intake.placeholder.fragility')} variant="filled" fullWidth value={formData.fragility || ''} onChange={(e) => updateField('fragility', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.originPostal')} placeholder={tr('intake.placeholder.originPostal')} variant="filled" fullWidth value={formData.origin || ''} onChange={(e) => updateField('origin', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.departureLocation')} placeholder={tr('intake.placeholder.departureLocation')} variant="filled" fullWidth value={formData.departure_location || ''} onChange={(e) => updateField('departure_location', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.departure')} placeholder={tr('intake.placeholder.departure')} variant="filled" fullWidth value={formData.departure_time || ''} onChange={(e) => updateField('departure_time', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label={tr('intake.label.statusDispatch')} placeholder={tr('intake.placeholder.statusDispatch')} variant="filled" fullWidth value={formData.status_dispatch || ''} onChange={(e) => updateField('status_dispatch', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label={tr('intake.label.contractHash')} placeholder={tr('intake.placeholder.contractHash')} variant="filled" fullWidth value={formData.contract_hash || ''} onChange={(e) => updateField('contract_hash', e.target.value)} />
          </Grid>
        </Grid>
      </Box>

      {/* Transit Phase */}
      <Box sx={{ border: '2px solid aqua', p: 2, mb: 5 }}>
        <Typography variant="subtitle2" color="aqua" sx={{ mb: 2 }}>
          {tr('intake.section.transitDetails')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Select
              value={formData.transportMode || ''}
              onChange={(e) => updateField('transportMode', e.target.value)}
              variant="filled"
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>{tr('intake.placeholder.transportMode')}</MenuItem>
              {Object.entries(transportOptions).map(([key, label]) => (
                <MenuItem key={key} value={key}>{label}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={formData.carrier || ''}
              onChange={(e) => updateField('carrier', e.target.value)}
              variant="filled"
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>{tr('intake.placeholder.carrier')}</MenuItem>
              {Object.entries(carrierOptions).map(([key, label]) => (
                <MenuItem key={key} value={key}>{label}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.weight')} placeholder={tr('intake.placeholder.weight')} variant="filled" fullWidth value={formData.weight || ''} onChange={(e) => updateField('weight', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.priority')} placeholder={tr('intake.placeholder.priority')} variant="filled" fullWidth value={formData.priority || ''} onChange={(e) => updateField('priority', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel label={tr('intake.label.insurance')} control={<Checkbox checked={formData.insurance || false} onChange={(e) => updateField('insurance', e.target.checked)} />} sx={{ mt: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <TextField label={tr('intake.label.statusTransit')} placeholder={tr('intake.placeholder.statusTransit')} variant="filled" fullWidth value={formData.status_transit || ''} onChange={(e) => updateField('status_transit', e.target.value)} />
          </Grid>
        </Grid>
      </Box>

      {/* Customs Phase */}
      <Box sx={{ border: '2px solid aqua', p: 2, mb: 5 }}>
        <Typography variant="subtitle2" color="aqua" sx={{ mb: 2 }}>
          {tr('intake.section.customsDetails')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField label={tr('intake.label.customsStatus')} placeholder={tr('intake.placeholder.customsStatus')} variant="filled" fullWidth value={formData.customs_clearance || ''} onChange={(e) => updateField('customs_clearance', e.target.value)} />
          </Grid>
        </Grid>
      </Box>

      {/* Delivery Phase */}
      <Box sx={{ border: '2px solid aqua', p: 2 }}>
        <Typography variant="subtitle2" color="aqua" sx={{ mb: 2 }}>
          {tr('intake.section.deliveryDetails')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.receiver')} placeholder={tr('intake.placeholder.receiver')} variant="filled" fullWidth value={formData.receiver || ''} onChange={(e) => updateField('receiver', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.destinationPostal')} placeholder={tr('intake.placeholder.destinationPostal')} variant="filled" fullWidth value={formData.destination || ''} onChange={(e) => updateField('destination', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.arrivalLocation')} placeholder={tr('intake.placeholder.arrivalLocation')} variant="filled" fullWidth value={formData.arrival_location || ''} onChange={(e) => updateField('arrival_location', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label={tr('intake.label.arrival')} placeholder={tr('intake.placeholder.arrival')} variant="filled" fullWidth value={formData.arrival_time || ''} onChange={(e) => updateField('arrival_time', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label={tr('intake.label.statusDelivery')} placeholder={tr('intake.placeholder.statusDelivery')} variant="filled" fullWidth value={formData.status_delivery || ''} onChange={(e) => updateField('status_delivery', e.target.value)} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default IntakeCoreForm;
