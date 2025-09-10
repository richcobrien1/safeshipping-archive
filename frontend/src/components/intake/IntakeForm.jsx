// frontend/src/components/intake/IntakeForm.jsx

import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  TextField
} from '@mui/material';
import { UserContext } from '../../context/UserProvider';
import { useAuth } from '../../auth/AuthContext';
import { t } from '../../locales/index';
import TabWrapper from './TabWrapper';
import IntakeFields from './IntakeFields';
import CryoFeedback from './CryoFeedback';
import LocalizedDropdown from './LocalizedDropdown';
import { logUserAction } from '../../utils/audit/AuditTrailLogger';
import { getOptionsByRegion } from '../../utils/intake/RegionCarrierUtils';

const IntakeForm = ({ role }) => {
  const { userLocale, userRegion } = useContext(UserContext);
  const { language } = useAuth();

  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  const [formData, setFormData] = useState({});
  const [apiPayload, setApiPayload] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const carrierOptions = getOptionsByRegion(userRegion)?.carriers || [];

  const handleManualSubmit = () => {
    logUserAction({ source: 'manual', role, timestamp: new Date(), action: 'submitOrder' });
    setFeedbackStatus('pending');
    setTimeout(() => setFeedbackStatus('success'), 1500);
  };

  const handleApiSubmit = () => {
    logUserAction({ source: 'api', role, timestamp: new Date(), action: 'submitOrderViaAPI' });
    setFeedbackStatus('pending');

    try {
      const parsed = JSON.parse(apiPayload);
      setApiResponse({ status: 'success', carrier: parsed.carrier });
      setFeedbackStatus('success');
    } catch {
      setApiResponse({ status: 'error', message: 'Invalid JSON' });
      setFeedbackStatus('error');
    }
  };

  return (
    <Box className="intake-view cryochrome" sx={{ px: 4, py: 5 }}>
      <TabWrapper defaultTab="Full Entry">
        <Divider sx={{ mt: 4, mb: 2, borderColor: 'aqua' }} />
        <div label={t('intake.panel.title', language)}>
          <IntakeFields
            role={role}
            userLocale={userLocale}
            formData={formData}
            setFormData={setFormData}
            region={userRegion}
          />

          <LocalizedDropdown
            label="carrier"
            options={carrierOptions}
            locale={userLocale}
            value={formData.carrier}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, carrier: e.target.value }))
            }
          />

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button variant="contained" onClick={handleManualSubmit}>
              {t('intake.actions.submitOrder', language)}
            </Button>
            <Box sx={{ mt: 2 }}>
              <CryoFeedback
                status={feedbackStatus}
                emoji={feedbackStatus === 'success' ? '✅' : feedbackStatus === 'error' ? '⚠️' : '🧊'}
                animation={feedbackStatus === 'pending' ? 'spin' : 'pulse'}
              />
            </Box>
          </Box>
        </div>

        <Divider sx={{ mt: 4, mb: 2, borderColor: 'aqua' }} />
        <div label="API Payload">
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {t('intake.section.manifestPaste', language)}
          </Typography>
          <TextField
            label={t('intake.field.rawManifest', language)}
            placeholder={t('intake.placeholder.apiPayload', language)}
            multiline
            rows={6}
            variant="filled"
            fullWidth
            value={apiPayload}
            onChange={(e) => setApiPayload(e.target.value)}
            InputProps={{ disableUnderline: true }}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderRadius: 2,
              fontFamily: 'monospace',
            }}
          />
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
                    ? `${t('intake.response.carrier', language)}: ${apiResponse.carrier}`
                    : `${t('intake.response.error', language)}: ${apiResponse.message}`
                }
              />
            </Box>
          )}
        </div>
      </TabWrapper>
    </Box>
  );
};

export default IntakeForm;
