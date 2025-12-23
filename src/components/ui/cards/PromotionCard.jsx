import { Box, Flex, Heading, Text, Button } from '@radix-ui/themes';
import { ArrowSquareOut, ArrowRight } from 'phosphor-react';

const textContainerStyle = {
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content'
};

const iconContainerStyle = {
  background: 'linear-gradient(90deg, rgba(249, 249, 249, 0) 0%, #E1D7F3 100%)',
  padding: '16px 18px 16px 0',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default function PromotionCard() {
  return (
    <Box
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#F9F9F9',
        backgroundImage: `linear-gradient(90deg, #E1D7F3 0%, #F9F9F9 100%)`,
        // border: '0.4px solid #A68DCE',
        borderRadius: '16px 48px 16px 48px',
        boxShadow: '0 0 0 0.4px #A68DCE',
        padding: 'var(--space-8)',
        // width: 'fit-content',
        width: 'min(95%, 1200px)',
        zIndex: 2
      }}
    >
      <Flex
        direction={{ '@initial': 'column', '@md': 'row' }}
        align={{ '@initial': 'center', '@md': 'flex-start' }}
        justify="between"
        gap="6"
      >
        {/* Left Container: Image and Prices */}
        <Box
          style={{
            flex: 1,
            justifyItems: 'center',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '480px',
            width: 'fit-content'
          }}
        >
          <img
            src="src/assets/pictures/promotion-products.png"
            alt="Pack de produits en promotion"
            style={{ width: '100%', borderRadius: '12px' }}
          />
          <Flex
            justify="center"
            align="center"
            gap="4"
            style={{
              borderRadius: '30px 8px 30px 8px',
              padding: '24px 24px',
              width: 'fit-content',
              marginTop: 'var(--space-4)',
              fontSize: '40px',
              backgroundColor: '#E1D7F3',
              boxShadow: '0 0 0 0.4px #A68DCE'
            }}
          >
            <Text as="span" style={{ textDecoration: 'line-through', color: '#A68DCE', fontSize: '32px' }}>
              99 MAD
            </Text>
            <Text as="span" style={{ fontWeight: 'bold', color: '#55286F' }}>
              79 MAD
            </Text>
          </Flex>
        </Box>

        {/* Right Container: Title, Subtitle, CTAs */}
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '50%',
            flex: 1,
            alignItems: 'flex-end',
            textAlign: 'right'
          }}
        >
          <Text as="span" style={{ fontSize: '32px', lineHeight: 1 }}>🎉</Text>
          <Heading
            as="h3"
            size="6"
            style={{ fontWeight: '500', fontFamily: 'Epilogue', color: '#55286F' }}
          >
            Notre Offre de lancement
          </Heading>
          <Text size="3" style={{ color: '#55286F', marginBottom: 'var(--space-4)' }}>
            Profitez de notre pack de lancement à prix exceptionnel.
          </Text>
          <Flex direction="column" align="end" justify="start" gap="3" style={{ marginTop: 'var(--space-4)' }}>
            <Button
              variant="surface"
              style={{
                background: '#F9F9F9',
                color: '#55286F',
                borderRadius: '6px 22px 6px 22px',
                boxShadow: '0 0 0 0.4px #A68DCE',
                fontSize: '18px',
                fontWeight: '300',
                height: 'fit-content',
                width: 'fit-content',
                padding: 0,
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={textContainerStyle}>
                  <span>Voir l'Offre</span>
                </div>
                <div style={iconContainerStyle}>
                  <ArrowSquareOut size={18} weight="duotone" style={{ color: '#B79BD4' }} />
                </div>
              </div>
            </Button>
            <Button
              variant="surface"
              style={{
                background: '#F9F9F9',
                color: '#55286F',
                borderRadius: '6px 22px 6px 22px',
                boxShadow: '0 0 0 0.4px #55286F',
                fontSize: '18px',
                fontWeight: '300',
                height: 'fit-content',
                width: 'fit-content',
                padding: 0,
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={textContainerStyle}>
                  <span>Commander Maintenant</span>
                </div>
                <div style={iconContainerStyle}>
                  <ArrowRight size={18} weight="duotone" style={{ color: '#55286F' }} />
                </div>
              </div>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
