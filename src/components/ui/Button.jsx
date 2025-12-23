import React, { useState } from 'react';

const triggerButtonStyle = {
  all: 'unset',
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  color: '#A68DCE',
  outline: 'none',
  boxShadow: 'none',
  cursor: 'pointer',
};

const entryBaseStyle = {
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 0 0 0.4px rgba(166, 141, 206, 0.3)',
  backgroundColor: '#F9F9F9',
  overflow: 'hidden',
  width: 'fit-content',
  transition: 'all 0.3s ease',
};

const entryLeftStyle = {
  ...entryBaseStyle,
  borderRadius: '4px 12px 4px 12px',
};

const entryRightStyle = {
  ...entryBaseStyle,
  borderRadius: '12px 4px 12px 4px',
};

const ctaEntryStyle = {
  ...entryRightStyle,
  backgroundColor: '#E1D7F3',
  boxShadow: '0 0 0 0.4px #55286F',
};

const iconContainerLeft = {
  background: 'linear-gradient(90deg, #E1D7F3 0%, rgba(249, 249, 249, 0) 100%)',
  padding: '8px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
};

const iconContainerRight = {
  ...iconContainerLeft,
};

const ctaIconStyle = {
  ...iconContainerRight,
  background: 'linear-gradient(90deg, #E1D7F3 0%, #B79BD4 100%)',
};

const textContainerLeft = {
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#55286F',
  fontWeight: 300,
  transition: 'all 0.3s ease',
};

const textContainerRight = {
  ...textContainerLeft,
};

const dividerStyle = {
  width: '0.2px',
  height: '16px',
  background: 'linear-gradient(180deg, #F9F9F9 0%, #A68DCE 50%, #F9F9F9 100%)',
};

const sizeMap = {
  s: { fontSize: 14, iconSize: 16 },
  m: { fontSize: 16, iconSize: 20 },
  l: { fontSize: 18, iconSize: 24 },
  xl: { fontSize: 20, iconSize: 28 },
  xxl: { fontSize: 22, iconSize: 32 },
};

export function Button({
  size = 's',
  icon,
  iconPosition = 'left',
  cta = false,
  iconBackground,
  style = {},
  children,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { fontSize, iconSize } = sizeMap[size] || sizeMap.s;
  const iconFirst = iconPosition === 'left';

  const entryStyle = cta && iconPosition === 'right'
    ? ctaEntryStyle
    : iconPosition === 'left'
      ? entryLeftStyle
      : entryRightStyle;

  const textStyle = {
    ...(cta && iconPosition === 'right'
      ? textContainerRight
      : iconPosition === 'left'
        ? textContainerLeft
        : textContainerRight),
    fontSize: `${fontSize}px`,
  };

  const iconStyle = {
    ...(cta && iconPosition === 'right'
      ? ctaIconStyle
      : iconFirst
        ? iconContainerLeft
        : iconContainerRight),
  };

  if (iconBackground) {
    iconStyle.background = iconBackground;
  }

  const iconEl = icon
    ? React.cloneElement(icon, { size: iconSize, ...icon.props })
    : null;

  // Subtle shadow elevation on hover - preserve original border
  const hoverEntryStyle = isHovered ? {
    boxShadow: '0 0 0 0.4px rgba(166, 141, 206, 0.3), 0 2px 8px rgba(85, 40, 111, 0.08)',
  } : {};

  return (
    <button
      type="button"
      style={triggerButtonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div style={{ ...entryStyle, ...hoverEntryStyle, ...style }}>
        {iconEl && iconFirst && <div style={iconStyle}>{iconEl}</div>}
        {iconEl && iconFirst && <div style={dividerStyle} />}
        <div style={textStyle}>{children}</div>
        {iconEl && !iconFirst && <div style={dividerStyle} />}
        {iconEl && !iconFirst && <div style={iconStyle}>{iconEl}</div>}
      </div>
    </button>
  );
}
