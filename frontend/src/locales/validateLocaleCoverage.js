import en from './en.json' assert { type: 'json' };
import es from './es.json' assert { type: 'json' };
import ja from './ja.json' assert { type: 'json' };

const locales = { en, es, ja };

export const validateLocaleCoverage = (keys = [], context = 'General') => {
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
    return { Context: context, Key: key, ...outcome };
  });

  console.group(`🌐 Locale Audit: ${context}`);
  console.table(results);
  console.groupEnd();
};
