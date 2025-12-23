import React from 'react';
import { Section, Flex, Heading, Text, Button } from '@radix-ui/themes';
import { At, Phone, MapPin, InstagramLogo, FacebookLogo, LinkedinLogo, TiktokLogo, Copy, User, Envelope } from 'phosphor-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" onClick={handleCopy} style={{
      padding: '4px',
      marginLeft: '8px',
      color: '#55286F',
      cursor: 'pointer',
      backgroundColor: 'transparent'
    }}>
      {copied ? (
        <Text size="1" style={{ color: '#4CAF50', fontFamily: 'Epilogue' }}>Copié!</Text>
      ) : (
        <Copy size={16} weight="duotone" />
      )}
    </Button>
  );
};

// Input styling based on NavBar search bar
const inputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 0 0 0.4px rgba(166, 141, 206, 0.3)',
  backgroundColor: '#F9F9F9',
  overflow: 'hidden',
  width: '100%',
  borderRadius: '12px 4px 12px 4px',
};


const inputStyle = {
  border: 'none',
  background: 'transparent',
  outline: 'none',
  fontSize: '18px',
  color: '#55286F',
  fontWeight: '300',
  width: '100%',
  padding: '8px 0',
  fontFamily: 'Epilogue, sans-serif',
};

const textareaContainerStyle = {
  ...inputContainerStyle,
  alignItems: 'flex-start',
  borderRadius: '12px 4px 12px 4px',
  padding: '8px 24px',
  width: '100%',
  boxSizing: 'border-box',
  position: 'relative' // Added for proper positioning of absolute elements
};

const textareaStyle = {
  ...inputStyle,
  minHeight: '120px',
  resize: 'vertical',
  padding: '12px 0',
  boxSizing: 'border-box',
};

export function ContactSection() {

  // Add placeholder styling
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input::placeholder, textarea::placeholder {
        color: #B79BD4 !important;
        font-style: italic !important;
        font-family: 'Epilogue', sans-serif !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const iconContainerStyle = {
    background:
      'linear-gradient(90deg, #E1D7F3 0%, rgba(249, 249, 249, 0) 100%)',
    padding: '16px 0',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px' // Fixed width to contain gradient
  };

  const textContainerStyle = {
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  };
  return (
    <Section
      id="contact"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 260px',
        width: '100%',
        alignItems: 'center'
      }}
    >
      {/* Section Title */}
      <Flex
        direction="column"
        style={{ flex: 1, gap: '16px' }}
      >
        <Heading
          as="h3"
          size="6"
          style={{
            fontFamily: 'Epilogue',
            fontWeight: '500',
            color: '#55286F',
          }}
        >
          Contact
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
          Une question ou envie de collaborer ? Envoyez-nous un message.
        </Text>
      </Flex>

      {/* Section Content */}
      <Flex style={{
        gap: '16px',
        width: '100%',
        height: 'fit-content',
        padding: '24px'
      }}>
        {/* Contact Info Container */}
        <Flex style={{
          backgroundColor: '#F9F9F9',
          boxShadow: '0 0 0 0.2px #A68DCE',
          width: '50%',
          borderRadius: '8px 30px 8px 30px',
          padding: '24px'
        }}>
          <Flex direction="column" style={{ width: '100%', gap: '16px' }}>
            {/* Email */}
            <Flex style={{
              backgroundColor: '#F9F9F9',
              height: 'fit-content',
              width: '100%',
              borderRadius: '6px 22px 6px 22px',
              color: '#55286F',
              alignItems: 'center',
              boxShadow: '0 0 0 0.2px #A68DCE',
              overflow: 'hidden' // Ensure no overflow
            }}>
              <div style={iconContainerStyle}>
                <At size={24} weight="duotone" />
              </div>
              <div style={textContainerStyle}>
                contact@odyva.com
                <CopyButton text="contact@odyva.com" />
              </div>
            </Flex>

            {/* Phone */}
            <Flex style={{
              backgroundColor: '#F9F9F9',
              height: 'fit-content',
              width: '100%',
              borderRadius: '6px 22px 6px 22px',
              color: '#55286F',
              alignItems: 'center',
              boxShadow: '0 0 0 0.2px #A68DCE',
              overflow: 'hidden'
            }}>
              <div style={iconContainerStyle}>
                <Phone size={24} weight="duotone" />
              </div>
              <div style={textContainerStyle}>
                +212 6 00 00 00 00
                <CopyButton text="+212 6 00 00 00 00" />
              </div>
            </Flex>

            {/* Location */}
            <Flex style={{
              backgroundColor: '#F9F9F9',
              height: 'fit-content',
              width: '100%',
              borderRadius: '6px 22px 6px 22px',
              color: '#55286F',
              alignItems: 'center',
              boxShadow: '0 0 0 0.2px #A68DCE',
              overflow: 'hidden'
            }}>
              <div style={iconContainerStyle}>
                <MapPin size={24} weight="duotone" />
              </div>
              <div style={textContainerStyle}>
                Casablanca, Morocco
                <CopyButton text="Casablanca, Morocco" />
              </div>
            </Flex>

            {/* Map Snippet */}
            <div style={{
              height: '200px',
              width: '100%',
              borderRadius: '6px 22px 6px 22px',
              overflow: 'hidden',
              marginTop: '16px',
              boxShadow: '0 0 0 0.2px #A68DCE'
            }}>
              <MapContainer
                center={[33.5731, -7.5898]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[33.5731, -7.5898]} />
              </MapContainer>
            </div>

            {/* Social Media Icons */}
            <Flex justify="center" gap="3" mt="4" align="center">
              <Text size="2" style={{ color: '#55286F', fontFamily: 'Epilogue', fontWeight: '300' }}>Suivez-nous:</Text>
              <Button asChild variant="soft" style={{
                backgroundColor: '#E1D7F3',
                color: '#55286F',
                borderRadius: '50%',
                padding: 'var(--space-2)',
                height: 'fit-content',
                boxShadow: '0 0 0 0.4px #A68DCE',
                cursor: 'pointer'
              }}>
                <a href="https://instagram.com/odyva" target="_blank" rel="noopener noreferrer">
                  <InstagramLogo weight="duotone" size={20} />
                </a>
              </Button>
              <Button asChild variant="soft" style={{
                backgroundColor: '#E1D7F3',
                color: '#55286F',
                borderRadius: '50%',
                padding: 'var(--space-2)',
                height: 'fit-content',
                boxShadow: '0 0 0 0.4px #A68DCE',
                cursor: 'pointer'
              }}>
                <a href="https://tiktok.com/@odyva" target="_blank" rel="noopener noreferrer">
                  <TiktokLogo weight="duotone" size={20} />
                </a>
              </Button>
              <Button asChild variant="soft" style={{
                backgroundColor: '#E1D7F3',
                color: '#55286F',
                borderRadius: '50%',
                padding: 'var(--space-2)',
                height: 'fit-content',
                boxShadow: '0 0 0 0.4px #A68DCE',
                cursor: 'pointer'
              }}>
                <a href="https://facebook.com/odyva" target="_blank" rel="noopener noreferrer">
                  <FacebookLogo weight="duotone" size={20} />
                </a>
              </Button>
              <Button asChild variant="soft" style={{
                backgroundColor: '#E1D7F3',
                color: '#55286F',
                borderRadius: '50%',
                padding: 'var(--space-2)',
                height: 'fit-content',
                boxShadow: '0 0 0 0.4px #A68DCE',
                cursor: 'pointer'
              }}>
                <a href="https://linkedin.com/company/odyva" target="_blank" rel="noopener noreferrer">
                  <LinkedinLogo weight="duotone" size={20} />
                </a>
              </Button>
            </Flex>
          </Flex>
        </Flex>

        {/* Contact Form Container */}
        <Flex
          direction={{ '@initial': 'column', '@md': 'row' }}
          gap="6"
          style={{
            width: '100%',
            backgroundColor: '#F9F9F9',
            padding: '24px',
            boxShadow: '0 0 0 0.2px #A68DCE',
            borderRadius: '30px 8px 30px 8px',
          }}
        >

          <Flex
            as="form"
            direction="column"
            style={{ flex: 1, gap: '16px', width: 'fit-content' }}
            onSubmit={(e) => e.preventDefault()}
          >

            {/* Row */}
            <Flex style={{
              gap: '16px'
            }}>
              {/* Name input */}
              <div style={inputContainerStyle}>
                <div style={iconContainerStyle}>
                  <User size={20} weight="duotone" style={{ color: '#A68DCE' }} />
                </div>
                <div style={textContainerStyle}>
                  <input
                    placeholder="Nom"
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={{
                  width: '0.2px',
                  height: '16px',
                  background: 'linear-gradient(180deg, #F9F9F9 0%, #A68DCE 50%, #F9F9F9 100%)'
                }}></div>

              </div>
              {/* Surname input */}
              <div style={inputContainerStyle}>
                <div style={iconContainerStyle}>
                  <User size={20} weight="duotone" style={{ color: '#A68DCE' }} />
                </div>
                <div style={textContainerStyle}>
                  <input
                    placeholder="Nom"
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={{
                  width: '0.2px',
                  height: '16px',
                  background: 'linear-gradient(180deg, #F9F9F9 0%, #A68DCE 50%, #F9F9F9 100%)'
                }}></div>

              </div>
            </Flex>


            {/* Email and phone inputs */}
            <Flex style={{ gap: '16px' }}>
              {/* Email input */}
              <div style={inputContainerStyle}>
                <div style={iconContainerStyle}>
                  <Envelope size={20} weight="duotone" style={{ color: '#A68DCE' }} />
                </div>
                <div style={textContainerStyle}>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={{
                  width: '0.2px',
                  height: '16px',
                  background: 'linear-gradient(180deg, #F9F9F9 0%, #A68DCE 50%, #F9F9F9 100%)'
                }}></div>
              </div>
              {/* Phone input */}
              <div style={inputContainerStyle}>
                <div style={iconContainerStyle}>
                  <Phone size={20} weight="duotone" style={{ color: '#A68DCE' }} />
                </div>
                <div style={textContainerStyle}>
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    style={inputStyle}
                  />
                </div>
                <div style={{
                  width: '0.2px',
                  height: '16px',
                  background: 'linear-gradient(180deg, #F9F9F9 0%, #A68DCE 50%, #F9F9F9 100%)'
                }}></div>
              </div>
            </Flex>

            {/* Message textarea */}
            <div style={textareaContainerStyle}>
              <textarea
                placeholder="Votre message"
                required
                rows={5}
                style={textareaStyle}
              ></textarea>
            </div>

            <Button
              type="submit"
              style={{
                borderRadius: '6px 22px 6px 22px',
                fontSize: '18px',
                fontWeight: '300',
                padding: '16px 18px',
                height: 'fit-content',
                width: 'fit-content',
                alignSelf: 'flex-end',
                background: '#55286F',
                color: '#E1D7F3',
                boxShadow: '0 0 0 0.4px #55286F',
              }}
            >
              Envoyer
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}
