export const getCountryCode = (locale:string):string => {
  const languageMap: { [key: string]: string } = {
    'en': 'US', // English
    'ja': 'JP', // Japanese
    'es': 'ES', // Spanish
    'fr': 'FR', // French
    'pt-br': 'BR', // Brazil
    // Add other language mappings here
  };
  return languageMap[locale] || 'US'; // Default to US if not found
};
