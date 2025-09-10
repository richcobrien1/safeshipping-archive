export const getOptionsByRegion = (region) => {
  const carriers = {
    NA: ['Maersk', 'FedEx', 'UPS'],
    EU: ['DHL', 'Hapag-Lloyd'],
    APAC: ['CMA CGM', 'NYK Line'],
  };
  return {
    labelKey: `region.${region}`, // for i18n of display label
    carriers: carriers[region] || []
  };
};
