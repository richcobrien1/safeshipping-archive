// frontend/src/components/intake/__tests__/IntakeFields.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IntakeFields from '../IntakeFields';

describe('IntakeFields', () => {
  const setup = (props) =>
    render(
      <IntakeFields
        role={props.role}
        userLocale={props.userLocale}
        formData={props.formData}
        setFormData={props.setFormData}
        region={props.region}
      />
    );

  it('renders agent fields', () => {
    const mockSetFormData = vi.fn();
    setup({
      role: 'agent',
      userLocale: 'en',
      formData: {},
      setFormData: mockSetFormData,
      region: 'NA',
    });

    expect(screen.getByLabelText(/Origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Manifest/i)).toBeInTheDocument();
  });

  it('renders ops-only fields including transport dropdown', () => {
    const mockSetFormData = vi.fn();
    setup({
      role: 'ops',
      userLocale: 'en',
      formData: {},
      setFormData: mockSetFormData,
      region: 'NA',
    });

    expect(screen.getByLabelText(/Contract Hash/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customs/i)).toBeInTheDocument();

    const dropdown = screen.queryByLabelText(/Transport/i) || screen.getByText((text) =>
      text.toLowerCase().includes('transport')
    );
    expect(dropdown).toBeTruthy();
  });

  it('shows insurance checkbox for courier transport', () => {
    const mockSetFormData = vi.fn();
    setup({
      role: 'ops',
      userLocale: 'en',
      formData: { transportMode: 'courier' },
      setFormData: mockSetFormData,
      region: 'NA',
    });

    expect(screen.getByLabelText(/Insurance/i)).toBeInTheDocument();
  });

  it('shows aria-invalid for missing origin', () => {
    const mockSetFormData = vi.fn();
    setup({
      role: 'agent',
      userLocale: 'en',
      formData: { origin: '', destination: 'Denver', weight: '42', rawManifest: '{}' },
      setFormData: mockSetFormData,
      region: 'NA',
    });

    const originInput = screen.getByLabelText(/Origin/i);
    expect(originInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('updates formData on origin input', () => {
    const mockSetFormData = vi.fn();
    setup({
      role: 'agent',
      userLocale: 'en',
      formData: {},
      setFormData: mockSetFormData,
      region: 'NA',
    });

    fireEvent.change(screen.getByLabelText(/Origin/i), {
      target: { value: 'Tokyo' },
    });
    expect(mockSetFormData).toHaveBeenCalled();
  });
});
