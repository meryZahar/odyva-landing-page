import { Box, Heading, Text, Button, Flex } from '@radix-ui/themes';
import { Plus, ArrowSquareOut } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ id, image, name, price, variantId }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box style={{ width: '240px', flex: '0 0 auto' }}>
      <Box
        className="texture-grain"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 50%, #E1D7F3 100%)',
          borderRadius: '8px 30px 8px 30px',
          border: '1px solid rgba(166, 141, 206, 0.4)',
          boxShadow: isHovered
            ? '0 12px 40px rgba(85, 40, 111, 0.18), 0 8px 24px rgba(183, 155, 212, 0.12), 0 0 0 1px rgba(230, 197, 185, 0.3)'
            : '0 4px 12px rgba(85, 40, 111, 0.08), 0 2px 6px rgba(183, 155, 212, 0.06), 0 0 0 1px rgba(166, 141, 206, 0.1)',
          overflow: 'hidden',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
        }}
      >
        <Box
          style={{
            width: '100%',
            height: '280px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: 'var(--space-6)',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(249, 249, 249, 0) 100%)',
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
          />
        </Box>
        <Flex
          align="end"
          justify="between"
          style={{
            padding: '16px',
            background: 'linear-gradient(180deg, rgba(225, 215, 243, 0.3) 0%, rgba(225, 215, 243, 0.7) 100%)',
          }}
        >
          <Flex style={{
            flexDirection: 'column',
            textAlign: 'left',
            flex: '1 1 auto',
            gap: '16px'
          }}>
            {/*Product Name*/}

            <Heading
              as="h4"
              size="4"
              style={{
                margin: 0,
                color: '#55286F',
                fontFamily: 'Caveat',
                fontWeight: '300',
                textShadow: '0 1px 2px rgba(85, 40, 111, 0.1)',
              }}
            >
              {name}
            </Heading>

            {/*Product Price*/}
            <Box
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F9F9F9 100%)',
                width: 'fit-content',
                padding: '8px 12px',
                height: 'fit-content',
                borderRadius: '4px 12px 4px 12px',
                border: '1px solid rgba(166, 141, 206, 0.3)',
                boxShadow: '0 2px 8px rgba(85, 40, 111, 0.08)',
              }}>
              <Text as="span" style={{ fontSize: '18px', color: '#55286F', fontWeight: 600 }}>
                {price}
                <Text as="span" style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  padding: '0 0 0 4px'
                }}>MAD</Text>
              </Text>
            </Box>
          </Flex>

          <Flex gap="2">
            <Button
              variant="surface"
              aria-label="Add to cart"
              style={{
                ...iconButtonStyle,
                background: isHovered
                  ? 'linear-gradient(135deg, #55286F 0%, #B79BD4 100%)'
                  : '#F9F9F9',
                color: isHovered ? '#FFFFFF' : '#55286F',
                boxShadow: isHovered
                  ? '0 4px 12px rgba(85, 40, 111, 0.3)'
                  : '0 2px 6px rgba(85, 40, 111, 0.08)',
              }}
              onClick={() => addItem(variantId)}
            >
              <Plus size={24} weight="duotone" />
            </Button>
            <Button
              variant="surface"
              aria-label="View details"
              style={{
                ...iconButtonStyle,
                boxShadow: '0 2px 6px rgba(85, 40, 111, 0.08)',
              }}
              onClick={() => navigate(`/products/${id}`)}
            >
              <ArrowSquareOut size={24} weight="duotone" />
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

const iconButtonStyle = {
  background: '#F9F9F9',
  color: '#55286F',
  borderRadius: '50%',
  border: '1px solid rgba(166, 141, 206, 0.3)',
  padding: '8px',
  height: 'fit-content',
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};
