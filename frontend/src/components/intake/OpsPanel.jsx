import {
  TextField,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { t } from "../../locales/index";
import { useAuth } from "../../auth/AuthContext";

const OpsPanel = ({ OpsPaneltitle = "intake.opsPanel.title" }) => {
  const { language } = useAuth();

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t(OpsPaneltitle, language)}
      </Typography>
      <Divider sx={{ mb: 3, borderColor: "aqua" }} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label={t("intake.opsPanel.futureField", language)}
            variant="filled"
            fullWidth
            InputProps={{ disableUnderline: true }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default OpsPanel;
