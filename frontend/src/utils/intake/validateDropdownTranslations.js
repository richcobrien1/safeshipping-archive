import en from './en.json';
import es from './es.json';
import ja from './ja.json';

const locales = { en, es, ja };

export const validateDropdownTranslations = (keys = []) => {
  const results = keys.map((key) => {
    const outcome = {};
    for (const lang in locales) {
      const parts = key.split('.');
      let value = locales[lang];
      for (const part of parts) {
        value = value?.[part];
      }
      outcome[lang] = value || '❌ MISSING';
    }
    return { key, ...outcome };
  });

  console.table(results);
};
