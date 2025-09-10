import React, { useContext, useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { UserContext } from '../context/UserProvider';
import { useAuth } from '../auth/AuthContext';
import CryoFeedback from '../components/intake/CryoFeedback';
import IntakeCoreForm from '../components/intake/IntakeCoreForm';
import { logUserAction } from '../utils/audit/AuditTrailLogger';
import { t } from '../locales/index';

const SafeShippingIntakeForm = ({ title }) => {
  const { userRole, userLocale } = useContext(UserContext);
  const { language } = useAuth();

  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  const [apiPayload, setApiPayload] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    insurance: false,
    shipment_id: '',
    carrier: '',
    departure_time: '',
    arrival_time: '',
    fragility: '',
    sender: '',
    receiver: '',
    priority: '',
    contract_hash: '',
    customs_clearance: '',
    transportMode: '',
    contents: '',
    departure_location: '',
    arrival_location: '',
    status_dispatch: '',
    status_transit: '',
    status_delivery: '',
  });

  // 🔁 Field updater + manifest preview sync
  const updateField = (field, value) => {
    const next = { ...formData, [field]: value };
    const manifest = Object.entries(next).reduce((acc, [key, val]) => {
      const valid = Array.isArray(val) ? val.length > 0 : val !== '';
      if (valid) acc[key] = val;
      return acc;
    }, {});
    setFormData(next);
    setApiPayload(JSON.stringify(manifest, null, 2));
  };

  // 🔁 Manifest paste hydration
  const handleManifestPaste = (e) => {
    const raw = e.target.value;
    setApiPayload(raw);
    try {
      const parsed = JSON.parse(raw);
      const safe = Object.entries(parsed).reduce((acc, [key, val]) => {
        acc[key] = val ?? '';
        return acc;
      }, {});
      setFormData(prev => ({ ...prev, ...safe }));
    } catch (err) {
      console.warn('Manifest JSON parse error:', err);
    }
  };

  const handleFormSubmit = () => {
    logUserAction({
      source: 'manual',
      role: userRole,
      timestamp: new Date(),
      action: 'submitOrder',
    });
    setFeedbackStatus('pending');
    setTimeout(() => setFeedbackStatus('success'), 1500);
  };

  const handleApiSubmit = async () => {
    logUserAction({
      source: 'api',
      role: userRole,
      timestamp: new Date(),
      action: 'submitOrderViaAPI',
    });

    setFeedbackStatus('pending');

    try {
      const res = await fetch('http://localhost:8080/api/intake/manifest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: apiPayload
      });

      const result = await res.json();

      if (res.ok && result.token) {
        setApiResponse({
          status: 'success',
          carrier: result.carrier,
          token: result.token,
          timestamp: result.timestamp
        });
        setFeedbackStatus('success');
      } else {
        throw new Error(result.message || 'Unknown error');
      }
    } catch (err) {
      setApiResponse({ status: 'error', message: err.message });
      setFeedbackStatus('error');
    }
  };

  return (
    <Box className="intake-view cryochrome" sx={{ px: 4, py: 5 }}>
      {/* 🔲 Intake Form */}
      <Box sx={{ p: 2, mb: 4 }}>
        <Typography variant="subtitle2" color="aqua" sx={{ mb: 2 }}>
          Sender → Transit → Customs → Delivery
        </Typography>
        <IntakeCoreForm
          userLocale={userLocale}
          formData={formData}
          updateField={updateField} // ✅ use correct prop
        />
      </Box>

      {/* ✅ Submission Controls */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" onClick={handleFormSubmit}>
          {t('intake.actions.submitOrder', language)}
        </Button>
        <Box sx={{ mt: 2 }}>
          <CryoFeedback
            status={feedbackStatus}
            emoji={
              feedbackStatus === 'success' ? '✅' :
              feedbackStatus === 'error' ? '⚠️' : '🧊'
            }
            animation={feedbackStatus === 'pending' ? 'spin' : 'pulse'}
          />
        </Box>
      </Box>

      {/* 🔲 API Payload Panel */}
      <Box sx={{ border: '2px solid aqua', p: 2, mt: 5, mb: 4 }}>
        <Typography variant="subtitle2" color="aqua" sx={{ mb: 2 }}>
          {t('intake.section.APIInputDetails', language)}
        </Typography>
        <Divider sx={{ mb: 2, borderColor: 'aqua' }} />
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {t('intake.section.manifestPaste', language)}
        </Typography>

        <Box
          sx={{
            border: '1px solid aqua',
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.04)',
            padding: '1rem',
            fontFamily: 'monospace',
            color: '#e0f7fa'
          }}
        >
          <TextareaAutosize
            value={apiPayload}
            onChange={handleManifestPaste}
            minRows={6}
            maxRows={24}
            style={{
              width: '100%',
              resize: 'none',
              overflow: 'hidden',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              color: 'inherit',
              boxSizing: 'border-box'
            }}
          />
        </Box>

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={handleApiSubmit}
        >
          {t('intake.actions.submitViaApi', language)}
        </Button>

        {apiResponse && (
          <Box sx={{ mt: 3 }}>
            <CryoFeedback
              status={apiResponse.status}
              emoji={apiResponse.status === 'success' ? '📦' : '❌'}
              animation={apiResponse.status === 'success' ? 'bounce' : 'shake'}
              message={
                apiResponse.status === 'success'
                  ? `✅ Verified Blockchain Token:\n${apiResponse.token}\nCarrier: ${apiResponse.carrier}\nTimestamp: ${apiResponse.timestamp}`
                  : `❌ Error: ${apiResponse.message}`
              }
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SafeShippingIntakeForm;
