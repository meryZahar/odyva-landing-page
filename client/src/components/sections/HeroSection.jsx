// src/components/HeroSection.jsx
import {
  Section,
  Container,
  Box,
  Heading,
  Text,
  Button,
  Flex
} from '@radix-ui/themes';
import { HandWaving, ShoppingBag } from 'phosphor-react';
import decorationLeft from '../../assets/decoration-left.svg';
import decorationRight from '../../assets/decoration-right.svg';

const textContainerStyle = {
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  color: '#E1D7F3'
};

const iconContainerBase = {
  padding: '15px 16px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content'
};

const iconContainerStyle = {
  ...iconContainerBase,
  background: 'linear-gradient(90deg, rgba(249, 249, 249, 0) 0%, #E1D7F3 100%)'
};

const iconContainerLeftStyle = {
  ...iconContainerBase,
  background: 'linear-gradient(90deg, #E1D7F3 0%, rgba(249, 249, 249, 0) 100%)'
};

export function HeroSection() {
  return (
    <Section
      as="section"
      id="home"
      style={{
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-16)',
        background: 'linear-gradient(135deg, #E1D7F3 0%, #F9F9F9 100%)',
        height: '640px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* Left Decoration - Full height, left edge */}
      <img
        src={decorationLeft}
        alt=""
        style={{
          position: 'absolute',
          right: '900px',
          top: '-400px',
          zIndex: 0
        }}
      />

      {/* Right Decoration - Full height, right edge */}
      <img
        src={decorationRight}
        alt=""
        style={{
          position: 'absolute',
          right: '0',
          top: '0',
          zIndex: 0
        }}
      />

      <Container style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <Flex
          direction={{ '@initial': 'column', '@md': 'row' }}
          gap={{ '@initial': '$6', '@md': '$12' }}
          align="center"
          justify="center"
          style={{ height: '100%', position: 'relative', zIndex: 1, maxWidth: '1200px' }}
        >
          {/* Text Column - Centered */}
          <Box style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '550px',
            flex: '0 1 auto'
          }}>
            <Heading
              as="h1"
              size="9"
              style={{
                fontFamily: 'Caveat, cursive',
                color: '#55286F',
                fontWeight: '400',
                lineHeight: '1.1',
                marginBottom: 'var(--space-4)'
              }}
            >
              Naturellement Éclatante,<br />
              Authentiquement Vous
            </Heading>
            <Text size="lg" style={{
              color: '#55286F',
              marginBottom: 'var(--space-6)',
              lineHeight: '1.6',
              fontSize: '20px'
            }}>
              Odyva vous offre des soins biologiques de luxe, conçus pour
              sublimer votre peau avec des ingrédients naturels, tout en
              respectant la planète.
            </Text>
            <Flex gap="3" style={{ marginTop: 'auto' }}>
              <Button
                asChild
                variant="surface"
                style={{
                  background: '#F9F9F9',
                  color: '#55286F',
                  borderRadius: '8px 30px 8px 30px',
                  boxShadow: '0 0 0 0.4px #A68DCE',
                  fontSize: '24px',
                  fontWeight: '300',
                  height: 'fit-content',
                  width: 'fit-content',
                  padding: 0,
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 40, 111, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 0 0.4px #A68DCE';
                }}
              >
                <a href="/about" style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#E1D7F3', boxShadow: '0 0 0 0.4px #55286F' }}>
                    <div style={{
                      ...iconContainerLeftStyle,
                      background: 'linear-gradient(90deg, #B79BD4 0%, #E1D7F3 100%)'
                    }}>
                      <HandWaving size={24} weight="duotone" style={{ color: '#55286F' }} />
                    </div>
                    {/* Separator */}
                    <div style={{
                      width: '1px',
                      height: '24px',
                      background: 'linear-gradient(180deg, transparent 0%, #A68DCE 50%, transparent 100%)',
                    }} />
                    <div style={{ ...textContainerStyle, color: '#55286F' }}>
                      <span>Notre Coopérative</span>
                    </div>
                  </div>
                </a>
              </Button>
              <Button
                asChild
                variant="surface"
                style={{
                  background: '#55286F',
                  color: '#E1D7F3',
                  borderRadius: '30px 8px 30px 8px',
                  boxShadow: '0 0 0 0.4px #55286F',
                  fontSize: '24px',
                  fontWeight: '300',
                  height: 'fit-content',
                  width: 'fit-content',
                  padding: 0,
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 40, 111, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 0 0.4px #55286F';
                }}
              >
                <a href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={textContainerStyle}>
                      <span>Nos Produits</span>
                    </div>
                    {/* Separator */}
                    <div style={{
                      width: '1px',
                      height: '24px',
                      background: 'linear-gradient(180deg, transparent 0%, #B79BD4 50%, transparent 100%)',
                    }} />
                    <div style={{ ...iconContainerStyle, background: '#55286F' }}>
                      <ShoppingBag size={24} weight="duotone" style={{ color: '#B79BD4' }} />
                    </div>
                  </div>
                </a>
              </Button>
            </Flex>
          </Box>

          {/* Image Column - Right Side */}
          <Box style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1 1 auto',
          }}>
            <img
              src="/src/assets/pictures/hero-image.png"
              alt="Jeune femme appliquant un soin visage"
              style={{
                position: 'relative',
                right: '-100px',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Flex>
      </Container>
    </Section>
  );
}
