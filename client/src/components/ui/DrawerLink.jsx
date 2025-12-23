import React from 'react';
import { ArrowSquareOut } from 'phosphor-react';

const drawerLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0 8px 0',
  marginBottom: 'var(--space-3)',
  color: '#55286F',
  fontWeight: 300,
  fontSize: '18px',
  textDecoration: 'none',
  borderBottom: '0.2px solid rgba(166, 141, 206, 0.3)',
  position: 'relative',
  transition: 'background-color 0.2s',
};

const drawerArrowStyle = {
  transition: 'opacity 0.2s, transform 0.2s',
  color: '#A68DCE',
};

export function DrawerLink({ href, children }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a
      href={href}
      style={{
        ...drawerLinkStyle,
        backgroundColor: hovered ? 'rgba(225, 215, 243, 0.3)' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="drawer-link"
    >
      {children}
      <ArrowSquareOut
        size={12}
        weight="duotone"
        style={{
          ...drawerArrowStyle,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
        }}
        className="drawer-arrow"
      />
    </a>
  );
}
