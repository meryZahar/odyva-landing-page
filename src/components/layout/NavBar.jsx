// src/components/NavBar.jsx
import React from 'react';
import { Flex, Container } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import {
  List,
  MagnifyingGlass,
  CaretDown,
  ArrowLeft,
} from 'phosphor-react';
import { ErrorBoundary } from './ErrorBoundary';
import logo from '../../assets/logo-dark.svg';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';
import { DrawerLink } from '../ui/DrawerLink';
import { AuthModal } from '../ui/AuthModal';

const sectionTitleStyle = {
  padding: '48px 0px 16px 0px',
  color: '#55286F',
  fontWeight: '500',
  fontSize: '24px',
};

const iconButtonStyle = {
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
};

const backButtonContainerStyle = {
  backgroundColor: '#E1D7F3',
  boxShadow: '0 0 0 0.2px #B79BD4',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export function NavBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();

  return (
    <ErrorBoundary fallback={<nav>NavBar inaccessible</nav>}>
      <Container>
        <Flex
          align="center"
          justify="between"
          style={{
            padding: '12px 16px',
            background: 'radial-gradient(ellipse at center, rgba(225, 215, 243, 0.4) 0%, rgba(249, 249, 249, 0.95) 70%)',
            backdropFilter: 'blur(12px) saturate(180%)',
            borderRadius: '8px 30px 8px 30px',
            border: '1px solid rgba(166, 141, 206, 0.4)',
            boxShadow: '0 8px 32px rgba(85, 40, 111, 0.12), 0 4px 16px rgba(183, 155, 212, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            margin: 'var(--space-4)',
            position: 'fixed',
            top: 'var(--space-4)',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '1060px',
            width: 'calc(100% - 2 * var(--space-4))',
            zIndex: 9999,
          }}
        >
          {/* Left Group: Menu and Search */}
          <Flex align="center" gap="2" style={{ flex: 1 }}>
            {/* Hamburger */}
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Button
                icon={<List weight="duotone" />}
                onClick={() => setMenuOpen(true)}
              >
                <span>Menu</span>
                <CaretDown
                  size={12}
                  weight="bold"
                  style={{
                    color: '#A68DCE',
                    transition: 'transform 0.2s',
                    transform: menuOpen ? 'rotate(90deg)' : 'rotate(-90deg)',
                  }}
                />
              </Button>
              <Drawer side="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
                <button
                  type="button"
                  style={{
                    ...iconButtonStyle,
                    alignSelf: 'flex-end',
                    marginBottom: 'var(--space-4)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <div style={backButtonContainerStyle}>
                    <ArrowLeft size={16} weight="bold" style={{ color: '#55286F' }} />
                  </div>
                </button>
                <div style={{ ...sectionTitleStyle, marginBottom: 'var(--space-3)' }}>Navigation</div>
                <DrawerLink href="/">Accueil</DrawerLink>
                <DrawerLink href="/products">Boutique</DrawerLink>
                <DrawerLink href="/about">À propos nous</DrawerLink>
                <div
                  style={{
                    marginTop: 'var(--space-6)',
                    marginBottom: 'var(--space-4)',
                    height: '0.2px',
                    background: '#A68DCE',
                  }}
                />
                <div style={{ ...sectionTitleStyle, marginBottom: 'var(--space-3)' }}>Catégories</div>
                <DrawerLink href="/products?category=visage">Soin du visage</DrawerLink>
                <DrawerLink href="/products?category=corps">Soin du corps</DrawerLink>
                <DrawerLink href="/product?category=maquillage">Maquillage</DrawerLink>
              </Drawer>
            </div>

            <Button
              icon={<MagnifyingGlass weight="duotone" style={{ color: '#A68DCE' }} />}
              iconPosition="right"
              size="s"
              iconBackground="linear-gradient(90deg, rgba(249, 249, 249, 0) 0%, #E1D7F3 100%)"
              style={{ maxWidth: '240px' }}
            >
              <input
                placeholder="Rechercher un produit"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    navigate(`/products?q=${encodeURIComponent(search)}`);
                  }
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#55286F',
                  fontWeight: '300',
                  width: '100%',
                  fontFamily: 'Epilogue, sans-serif',
                }}
              />
              <style>{`
                input::placeholder {
                  color: #B79BD4 !important;
                  font-style: italic !important;
                  font-family: 'Epilogue', sans-serif !important;
                }
              `}</style>
            </Button>
          </Flex>

          {/* Center: Logo */}
          <a href="/">
            <div
              style={{
                display: 'flex',
                width: 'fit-content',
                height: '100%',
              }}
            >
              <img
                src={logo}
                alt="Odyva"
                style={{
                  height: '40px',
                  width: 'auto',
                }}
              />
            </div>
          </a>

          {/* Right Group: Cart and Sign-up */}
          <Flex align="center" gap="2" style={{ flex: 1, justifyContent: 'flex-end' }}>
            {/* Sign-in */}
            <AuthModal />
          </Flex>
        </Flex>
      </Container>
    </ErrorBoundary>
  );
}
