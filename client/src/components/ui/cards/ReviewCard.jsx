import { Flex, Text } from '@radix-ui/themes';
import { Star } from 'phosphor-react';
import { useState } from 'react';

export default function ReviewCard({ reviewer, city, date, rating, productName, productLink, comment }) {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const charLimit = 120;
  const shouldTruncate = comment.length > charLimit;

  return (
    <Flex
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 50%, #E1D7F3 100%)',
        borderRadius: '8px 30px 8px 30px',
        border: '1px solid rgba(166, 141, 206, 0.4)',
        boxShadow: isHovered
          ? '0 12px 40px rgba(85, 40, 111, 0.15), 0 8px 24px rgba(183, 155, 212, 0.1), 0 0 0 1px rgba(230, 197, 185, 0.3)'
          : '0 4px 12px rgba(85, 40, 111, 0.08), 0 2px 6px rgba(183, 155, 212, 0.06), 0 0 0 1px rgba(166, 141, 206, 0.1)',
        padding: '24px',
        width: '320px',
        gap: '16px',
        textAlign: 'left',
        height: expanded ? 'fit-content' : '380px',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Flex style={{ flexDirection: 'column', gap: '8px' }}>
        <Flex align="center" gap="3">
          <Text
            as="span"
            style={{
              fontSize: '20px',
              fontFamily: 'Epilogue',
              fontWeight: '500',
              color: '#55286F',
              textShadow: '0 1px 2px rgba(85, 40, 111, 0.1)',
            }}
          >
            {reviewer}
          </Text>
          <Text
            as="span"
            style={{
              fontSize: '16px',
              fontFamily: 'Epilogue',
              fontWeight: '300',
              color: '#B79BD4',
            }}
          >
            {city}
          </Text>
        </Flex>
        <Text
          as="span"
          style={{
            fontSize: '14px',
            fontFamily: 'Epilogue',
            fontWeight: '300',
            color: '#A68DCE',
          }}
        >
          {date}
        </Text>
      </Flex>
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #E6C5B9 20%, #B79BD4 50%, #E6C5B9 80%, transparent 100%)',
          opacity: 0.5,
        }}
      />
      <Flex gap="1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={20}
            weight={i < rating ? 'fill' : 'regular'}
            style={{ color: '#EFD807', filter: 'drop-shadow(0 1px 2px rgba(239, 216, 7, 0.3))' }}
          />
        ))}
      </Flex>
      <Text
        as="a"
        href={productLink}
        style={{
          fontSize: '16px',
          fontFamily: 'Epilogue',
          fontWeight: '500',
          color: '#55286F',
          textDecoration: 'none',
          backgroundImage: 'linear-gradient(120deg, #E6C5B9 0%, #B79BD4 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '0% 2px',
          backgroundPosition: '0 100%',
          transition: 'background-size 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundSize = '100% 2px';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundSize = '0% 2px';
        }}
      >
        {productName}
      </Text>
      <Text
        as="p"
        style={{
          fontSize: '16px',
          fontFamily: 'Epilogue',
          fontWeight: '300',
          color: '#55286F',
          margin: 0,
          lineHeight: '1.6',
          display: expanded ? 'block' : '-webkit-box',
          WebkitLineClamp: expanded ? 'none' : 5,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {comment}
      </Text>
      {shouldTruncate && (
        <Text
          as="button"
          onClick={() => setExpanded(!expanded)}
          style={{
            fontSize: '14px',
            fontFamily: 'Epilogue',
            fontWeight: '500',
            color: '#B79BD4',
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            alignSelf: 'flex-start',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#55286F';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#B79BD4';
          }}
        >
          {expanded ? '← Voir moins' : 'Voir plus →'}
        </Text>
      )}
    </Flex>
  );
}

