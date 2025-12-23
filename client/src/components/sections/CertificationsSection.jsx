import { Section, Heading, Flex, Text, Button } from '@radix-ui/themes';
import { CertificationCard } from '../ui/cards';
import { Plus, ArrowSquareOut } from 'phosphor-react';
import certifications from "../../data/certifications";

export function CertificationsSection() {
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
  return (
    <Section id="certifications" style={{
      display: 'flex',
      padding: '40px 260px',
      flexDirection: 'row',
      width: '100%',
      gap: '16px',
      height: 'fit-content'
    }}>
      <Flex style={{
        width: '480px',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <Heading
          as="h3"
          size="6"
          style={{
            fontFamily: 'Epilogue',
            fontWeight: '500',
            color: '#55286F',
          }}
        >
          Certifications
        </Heading>
        <Text
          as="p"
          size="3"
          style={{
            fontFamily: 'Epilogue',
            fontWeight: '300',
            color: '#55286F',
            margin: 0,
          }}
        >
          Certifiés pour la qualité, la durabilitéet l’éthique.
        </Text>

        <Button
          asChild
          variant="surface"
          style={{
            background: '#F9F9F9',
            color: '#55286F',
            borderRadius: '6px 22px 6px 22px',
            fontSize: '18px',
            boxShadow: '0 0 0 0.4px #A68DCE',
            fontWeight: '300',
            height: 'fit-content',
            width: 'fit-content',
            padding: 0,
            overflow: 'hidden',
            marginTop: 'var(--space-6)',
            alignSelf: 'flex-start',
            cursor: 'pointer',
          }}
        >
          <a href="#certifications" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={textContainerStyle}>
                <span>Voir Tous</span>
              </div>
              <div style={iconContainerStyle}>
                <ArrowSquareOut size={18} weight="duotone" style={{ color: '#B79BD4' }} />
              </div>
            </div>
          </a>
        </Button>
      </Flex>
      <Flex gap="4" style={{
        width: '100%'
      }}>
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} {...cert} />
        ))}
      </Flex>
    </Section>
  );
}