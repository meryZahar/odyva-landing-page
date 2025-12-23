import { Flex, Text, Box } from '@radix-ui/themes';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default function CertificationCard({ logo, title, description, short }) {
  return (
    <Tippy
      content={<span>{description}</span>}
      followCursor
      plugins={[followCursor]}
      offset={[0, 16]}
    >
      <Flex
        style={{
          flexDirection: 'column',
          background: '#F9F9F9',
          borderRadius: '8px 30px 8px 30px',
          boxShadow: '0 0 0 0.4px #A68DCE',
          textAlign: 'center',
          width: 'fit-content',
          minHeight: '380px',
          cursor: 'pointer',
          height: 'fit-content',
        }}
      >
        <Box style={{
          height: '240px',
          objectFit: 'cover',
          marginBottom: '24px'
        }}>
          <img
            src={logo}
            alt={title}
            style={{
              height: '100%',
            }}
          />
        </Box>

        {/* Card Footer */}
        <Flex style={{
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          background: 'linear-gradient(180deg, #F9F9F9 0%, #E1D7F3 100%)',
          borderRadius: '8px 30px 8px 30px'
        }}>
          <Text
            as="span"
            style={{
              fontSize: '24px',
              fontFamily: 'Epilogue',
              fontWeight: '500',
              color: '#55286F',
              textAlign: 'left',
            }}
          >
            {title}
          </Text>
          <div style={{
            width: '100%',
            boxShadow: '0 0 0 0.2px #A68DCE',
          }}></div>
          <Text
            as="span"
            style={{
              fontSize: '16px',
              fontFamily: 'Epilogue',
              fontWeight: '300',
              color: '#55286F',
              textAlign: 'left',
            }}
          >
            {short}
          </Text>
        </Flex>
      </Flex>
    </Tippy>
  );
}
