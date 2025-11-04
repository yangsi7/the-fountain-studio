import { describe, it, expect } from 'vitest';

describe('i18n system - critical validation', () => {
  it('German dictionary exists and is valid JSON', async () => {
    const deDictModule = await import('@/dictionaries/de.json');
    const deDict = deDictModule.default;

    // Verify critical keys exist
    expect(deDict.hero).toBeDefined();
    expect(deDict.hero.title).toBe('Frequenz ist Alles');
    expect(deDict.services).toBeDefined();
    expect(deDict.booking).toBeDefined();
  });

  it('English dictionary exists and is valid JSON', async () => {
    const enDictModule = await import('@/dictionaries/en.json');
    const enDict = enDictModule.default;

    // Verify critical keys exist
    expect(enDict.hero).toBeDefined();
    expect(enDict.hero.title).toBe('Frequency is Everything');
    expect(enDict.services).toBeDefined();
    expect(enDict.booking).toBeDefined();
  });

  it('German and English dictionaries have matching structure', async () => {
    const deDict = (await import('@/dictionaries/de.json')).default;
    const enDict = (await import('@/dictionaries/en.json')).default;

    // Check top-level keys match
    const deKeys = Object.keys(deDict);
    const enKeys = Object.keys(enDict);

    expect(deKeys.sort()).toEqual(enKeys.sort());
  });
});
