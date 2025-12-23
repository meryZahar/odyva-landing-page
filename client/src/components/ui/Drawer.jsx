import React from 'react';
import ReactDOM from 'react-dom';

export function Drawer({ side, open, onClose, children }) {
  const drawerRef = React.useRef(null);

  const isBottom = side === 'bottom';
  const isLeft = side === 'left';

  React.useEffect(() => {
    if (open && drawerRef.current) {
      const drawer = drawerRef.current;
      // Set initial transform based on side
      if (isBottom) {
        drawer.style.transform = 'translateY(100%)';
      } else {
        drawer.style.transform = isLeft ? 'translateX(-100%)' : 'translateX(100%)';
      }

      requestAnimationFrame(() => {
        drawer.style.transition = 'transform 0.3s ease-out';
        drawer.style.transform = isBottom ? 'translateY(0)' : 'translateX(0)';
      });
    }
  }, [open, side, isBottom, isLeft]);

  if (!open) return null;

  // Different styles for bottom vs side drawers
  const drawerStyle = isBottom ? {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '80vh',
    backgroundColor: '#F9F9F9',
    boxShadow: '0 -4px 24px rgba(85, 40, 111, 0.15), 0 -2px 12px rgba(183, 155, 212, 0.1)',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    zIndex: 1001,
    overflowY: 'auto',
  } : {
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: '260px',
    backgroundColor: '#F9F9F9',
    boxShadow: '0 0 0 0.2px rgba(166, 141, 206, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    zIndex: 1001,
    [side]: 0,
  };

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
        }}
      />
      <div
        ref={drawerRef}
        style={drawerStyle}
      >
        {children}
      </div>
    </>,
    document.body
  );
}
