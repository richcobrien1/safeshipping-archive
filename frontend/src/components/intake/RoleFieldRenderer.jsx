import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { t } from '../../locales/index';
import { getFields } from '../../utils/intake/fieldMap';

const RoleFieldRenderer = ({ role, mode, locale, region, formData = {}, setFormData = () => {} }) => {
  const fields = getFields(role, mode, region);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field.name]: value,
    }));
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';
    const labelText = t(`intake.label.${field.name}`, locale) || field.label || field.name;
    const placeholderText = t(`intake.placeholder.${field.name}`, locale) || field.placeholder || '';

    switch (field.type) {
      case 'select':
        return (
          <FormControl variant="filled" fullWidth sx={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 2 }}>
            <InputLabel sx={{ color: '#80deea' }}>{labelText}</InputLabel>
            <Select
              value={value}
              onChange={(e) => updateField(field, e.target.value)}
              sx={{
                color: '#e0f7fa',
                '& .MuiSelect-select': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: '0 0 4px 4px',
                    backgroundColor: 'rgba(0,50,70,0.85)',
                    color: '#e0f7fa',
                  },
                },
              }}
            >
              {field.options?.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => updateField(field, e.target.checked)}
                sx={{
                  color: '#e0f7fa',
                  '&.Mui-checked': {
                    color: '#26c6da',
                  },
                }}
              />
            }
            label={labelText}
            sx={{ ml: 1, color: '#80deea' }}
          />
        );

      default:
        return (
          <TextField
            label={labelText}
            placeholder={placeholderText}
            variant="filled"
            fullWidth
            value={value}
            onChange={(e) => updateField(field, e.target.value)}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: 2,
              input: { color: '#e0f7fa' },
            }}
          />
        );
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {fields.map((field, index) => (
        <Grid item xs={12} sm={6} key={index}>
          {renderField(field)}
        </Grid>
      ))}
    </Grid>
  );
};

export default RoleFieldRenderer;
