// src/styles/odyva-theme.js
import { createColorScale } from '@radix-ui/colors';

// Create Odyva color scales
export const odyvaPurpleScale = createColorScale({
  name: 'odyva-purple',
  base: '#A68DCE',
});

export const odyvaSecondaryScale = createColorScale({
  name: 'odyva-secondary',
  base: '#B79BD4',
});

export const odyvaAccentScale = createColorScale({
  name: 'odyva-accent',
  base: '#55286F',
});

export const odyvaLavenderScale = createColorScale({
  name: 'odyva-lavender',
  base: '#E1D7F3',
});

export const odyvaOffWhiteScale = createColorScale({
  name: 'odyva-offwhite',
  base: '#F9F9F9',
});

// Export the color tokens for Radix Themes
export const odyvaColors = {
  primary1: odyvaPurpleScale.primary1,
  primary2: odyvaPurpleScale.primary2,
  primary3: odyvaPurpleScale.primary3,
  primary4: odyvaPurpleScale.primary4,
  primary5: odyvaPurpleScale.primary5,
  primary6: odyvaPurpleScale.primary6,
  primary7: odyvaPurpleScale.primary7,
  primary8: odyvaPurpleScale.primary8,
  primary9: odyvaPurpleScale.primary9,
  primary10: odyvaPurpleScale.primary10,
  primary11: odyvaPurpleScale.primary11,
  primary12: odyvaPurpleScale.primary12,
  
  secondary1: odyvaSecondaryScale.primary1,
  secondary2: odyvaSecondaryScale.primary2,
  secondary3: odyvaSecondaryScale.primary3,
  secondary4: odyvaSecondaryScale.primary4,
  secondary5: odyvaSecondaryScale.primary5,
  secondary6: odyvaSecondaryScale.primary6,
  secondary7: odyvaSecondaryScale.primary7,
  secondary8: odyvaSecondaryScale.primary8,
  secondary9: odyvaSecondaryScale.primary9,
  secondary10: odyvaSecondaryScale.primary10,
  secondary11: odyvaSecondaryScale.primary11,
  secondary12: odyvaSecondaryScale.primary12,
  
  neutral1: odyvaOffWhiteScale.primary1,
  neutral2: odyvaLavenderScale.primary1,
}; 