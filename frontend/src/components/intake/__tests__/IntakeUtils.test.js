// frontend/src/components/intake/__tests__/IntakeUtils.test.js

import {
  validateFormByRole,
  resolveDropdownLabel,
  normalizeDropdownOptions
} from '../IntakeUtils';

describe('validateFormByRole()', () => {
  it('validates agent role with complete data', () => {
    const form = {
      origin: 'Tokyo',
      destination: 'Denver',
      weight: '42',
      rawManifest: '{"carrier":"CryoCore"}'
    };
    const result = validateFormByRole('agent', form);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('flags missing origin and bad weight for agent', () => {
    const form = {
      destination: 'Denver',
      weight: 'zero',
      rawManifest: ''
    };
    const result = validateFormByRole('agent', form);
    expect(result.isValid).toBe(false);
    expect(result.errors).toMatchObject({
      origin: expect.any(String),
      weight: expect.any(String),
      rawManifest: expect.any(String),
    });
  });

  it('validates ops contract hash', () => {
    const form = {
      contract_hash: '0x'.padEnd(66, 'a')
    };
    const result = validateFormByRole('ops', form);
    expect(result.isValid).toBe(true);
  });

  it('fails on malformed contract hash', () => {
    const form = { contract_hash: 'xyz123' };
    const result = validateFormByRole('ops', form);
    expect(result.isValid).toBe(false);
    expect(result.errors.contract_hash).toContain('contractHash');
  });
});

describe('resolveDropdownLabel()', () => {
  it('prefixes transport category', () => {
    expect(resolveDropdownLabel('cargo', 'transport')).toBe('intake.transport.cargo');
  });

  it('uses full key if already namespaced', () => {
    expect(resolveDropdownLabel('intake.transport.truck')).toBe('intake.transport.truck');
  });

  it('prefixes region key correctly', () => {
    expect(resolveDropdownLabel('EU', 'region')).toBe('intake.region.EU');
  });

  it('falls back to default label prefix', () => {
    expect(resolveDropdownLabel('carrier')).toBe('intake.label.carrier');
  });
});

describe('normalizeDropdownOptions()', () => {
  it('formats array of strings', () => {
    const raw = ['cargo', 'air'];
    const result = normalizeDropdownOptions(raw, 'transport');
    expect(result).toEqual([
      { value: 'cargo', text: 'intake.transport.cargo' },
      { value: 'air', text: 'intake.transport.air' }
    ]);
  });

  it('handles mixed format objects', () => {
    const raw = [
      { value: 'NA', labelKey: 'NorthAmerica' },
      { value: 'EU', text: 'Europe' }
    ];
    const result = normalizeDropdownOptions(raw, 'region');
    expect(result).toEqual([
      { value: 'NA', text: 'intake.region.NorthAmerica' },
      { value: 'EU', text: 'intake.region.Europe' }
    ]);
  });
});
