// frontend/src/components/intake/FormPanel.jsx

import {
  TextField,
  Typography,
  Grid,
  Divider,
  Box
} from "@mui/material";
import { t } from "../../locales/index";
import { useAuth } from "../../auth/AuthContext";

const FormPanel = ({ FormPaneltitle = "intake.panel.title" }) => {
  const { language } = useAuth();

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t(FormPaneltitle, language)}
      </Typography>
      <Divider sx={{ mb: 3, borderColor: "aqua" }} />

      <Grid container spacing={3}>
        <Grid>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <TextField
              label={t("intake.field.shipmentId", language)}
              variant="filled"
              InputProps={{ disableUnderline: true }}
              sx={{ minWidth: 300 }}
            />
            <TextField
              label={t("intake.field.destinationHub", language)}
              variant="filled"
              InputProps={{ disableUnderline: true }}
              sx={{ minWidth: 300 }}
            />
          </Box>
        </Grid>

        <Grid>
          <TextField
            label={t("intake.field.packageContents", language)}
            variant="filled"
            fullWidth
            multiline
            rows={4}
            InputProps={{ disableUnderline: true }}
          />
        </Grid>

        <Grid>
          <TextField
            label={t("intake.field.rawManifest", language)}
            placeholder={t("intake.placeholder.rawManifest", language)}
            variant="filled"
            fullWidth
            multiline
            rows={6}
            InputProps={{ disableUnderline: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormPanel;
