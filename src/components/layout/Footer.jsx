import React from 'react';
import { Section, Container, Flex, Heading, Text, Button } from '@radix-ui/themes';
import {
    InstagramLogo,
    FacebookLogo,
    LinkedinLogo,
    TiktokLogo,
    EnvelopeSimple,
    Heart
} from 'phosphor-react';
import logo from '../../assets/logo.svg';

const footerSectionTitleStyle = {
    fontFamily: 'Epilogue',
    fontWeight: '500',
    fontSize: '20px',
    color: '#55286F',
    marginBottom: '16px',
};

const footerLinkStyle = {
    fontFamily: 'Epilogue',
    fontWeight: '300',
    fontSize: '16px',
    color: '#B79BD4',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    display: 'block',
    marginBottom: '12px',
};

const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 0 0.4px rgba(166, 141, 206, 0.3)',
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
    width: '100%',
    borderRadius: '8px 30px 8px 30px',
    maxWidth: '300px',
};

const inputStyle = {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '14px',
    color: '#55286F',
    fontWeight: '300',
    width: '100%',
    padding: '12px 16px',
    fontFamily: 'Epilogue, sans-serif',
};

const iconContainerStyle = {
    background: 'linear-gradient(90deg, rgba(249, 249, 249, 0) 0%, #E1D7F3 100%)',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export function Footer() {
    const [email, setEmail] = React.useState('');

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement newsletter signup
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <Section
            as="footer"
            className="texture-grain"
            style={{
                backgroundColor: '#F9F9F9',
                borderTop: '1px solid #E1D7F3',
                paddingTop: '60px',
                paddingBottom: '40px',
                marginTop: '80px',
            }}
        >
            <Container>
                <Flex
                    direction={{ '@initial': 'column', '@md': 'row' }}
                    gap="8"
                    style={{
                        paddingLeft: '40px',
                        paddingRight: '40px',
                        marginBottom: '48px',
                    }}
                >
                    {/* Brand Section */}
                    <Flex
                        direction="column"
                        style={{
                            flex: '1',
                            maxWidth: '300px',
                        }}
                    >
                        <a href="/">
                            <img
                                src={logo}
                                alt="Odyva"
                                style={{
                                    height: '40px',
                                    marginBottom: '16px',
                                }}
                            />
                        </a>
                        <Text
                            size="2"
                            style={{
                                fontFamily: 'Epilogue',
                                fontWeight: '300',
                                color: '#B79BD4',
                                lineHeight: '1.6',
                                marginBottom: '24px',
                            }}
                        >
                            Des soins biologiques de luxe, conçus pour sublimer votre peau avec des ingrédients naturels.
                        </Text>

                        {/* Social Media */}
                        <Flex gap="2" align="center">
                            <Button
                                asChild
                                variant="soft"
                                style={{
                                    backgroundColor: '#E1D7F3',
                                    color: '#55286F',
                                    borderRadius: '50%',
                                    padding: 'var(--space-2)',
                                    height: 'fit-content',
                                    width: 'fit-content',
                                    boxShadow: '0 0 0 0.4px #A68DCE',
                                    cursor: 'pointer',
                                }}
                            >
                                <a href="https://instagram.com/odyva" target="_blank" rel="noopener noreferrer">
                                    <InstagramLogo weight="duotone" size={20} />
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="soft"
                                style={{
                                    backgroundColor: '#E1D7F3',
                                    color: '#55286F',
                                    borderRadius: '50%',
                                    padding: 'var(--space-2)',
                                    height: 'fit-content',
                                    width: 'fit-content',
                                    boxShadow: '0 0 0 0.4px #A68DCE',
                                    cursor: 'pointer',
                                }}
                            >
                                <a href="https://tiktok.com/@odyva" target="_blank" rel="noopener noreferrer">
                                    <TiktokLogo weight="duotone" size={20} />
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="soft"
                                style={{
                                    backgroundColor: '#E1D7F3',
                                    color: '#55286F',
                                    borderRadius: '50%',
                                    padding: 'var(--space-2)',
                                    height: 'fit-content',
                                    width: 'fit-content',
                                    boxShadow: '0 0 0 0.4px #A68DCE',
                                    cursor: 'pointer',
                                }}
                            >
                                <a href="https://facebook.com/odyva" target="_blank" rel="noopener noreferrer">
                                    <FacebookLogo weight="duotone" size={20} />
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="soft"
                                style={{
                                    backgroundColor: '#E1D7F3',
                                    color: '#55286F',
                                    borderRadius: '50%',
                                    padding: 'var(--space-2)',
                                    height: 'fit-content',
                                    width: 'fit-content',
                                    boxShadow: '0 0 0 0.4px #A68DCE',
                                    cursor: 'pointer',
                                }}
                            >
                                <a href="https://linkedin.com/company/odyva" target="_blank" rel="noopener noreferrer">
                                    <LinkedinLogo weight="duotone" size={20} />
                                </a>
                            </Button>
                        </Flex>
                    </Flex>

                    {/* Quick Links */}
                    <Flex
                        direction="column"
                        style={{
                            flex: '1',
                        }}
                    >
                        <div style={footerSectionTitleStyle}>Liens Rapides</div>
                        <a href="/" style={footerLinkStyle} onMouseOver={(e) => e.target.style.color = '#55286F'} onMouseOut={(e) => e.target.style.color = '#B79BD4'}>
                            Accueil
                        </a>
                        <a href="/products" style={footerLinkStyle} onMouseOver={(e) => e.target.style.color = '#55286F'} onMouseOut={(e) => e.target.style.color = '#B79BD4'}>
                            Boutique
                        </a>
                        <a href="/about" style={footerLinkStyle} onMouseOver={(e) => e.target.style.color = '#55286F'} onMouseOut={(e) => e.target.style.color = '#B79BD4'}>
                            À Propos
                        </a>
                        <a href="#contact" style={footerLinkStyle} onMouseOver={(e) => e.target.style.color = '#55286F'} onMouseOut={(e) => e.target.style.color = '#B79BD4'}>
                            Contact
                        </a>
                    </Flex>

                    {/* Legal Links */}
                    <Flex
                        direction="column"
                        style={{
                            flex: '1',
                        }}
                    >
                        <div style={footerSectionTitleStyle}>Informations Légales</div>
                        <a href="/privacy" style={footerLinkStyle} onMouseOver={(e) => e.target.style.color = '#55286F'} onMouseOut={(e) => e.target.style.color = '#B79BD4'}>
                            Politique de Confidentialité
                        </a>
                        <a href="/terms" style={footerLinkStyle} onMouseOver={(e) => e.target.style.color = '#55286F'} onMouseOut={(e) => e.target.style.color = '#B79BD4'}>
                            Conditions d'Utilisation
                        </a>
                        <a href="/returns" style={footerLinkStyle} onMouseOver={(e) => e.target.style.color = '#55286F'} onMouseOut={(e) => e.target.style.color = '#B79BD4'}>
                            Retours & Remboursements
                        </a>
                        <a href="/shipping" style={footerLinkStyle} onMouseOver={(e) => e.target.style.color = '#55286F'} onMouseOut={(e) => e.target.style.color = '#B79BD4'}>
                            Livraison
                        </a>
                    </Flex>

                    {/* Newsletter */}
                    <Flex
                        direction="column"
                        style={{
                            flex: '1',
                        }}
                    >
                        <div style={footerSectionTitleStyle}>Newsletter</div>
                        <Text
                            size="2"
                            style={{
                                fontFamily: 'Epilogue',
                                fontWeight: '300',
                                color: '#B79BD4',
                                marginBottom: '16px',
                                lineHeight: '1.6',
                            }}
                        >
                            Inscrivez-vous pour recevoir nos offres exclusives et nouveautés.
                        </Text>
                        <form onSubmit={handleNewsletterSubmit} style={{ width: '100%' }}>
                            <div style={inputContainerStyle}>
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={inputStyle}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        ...iconContainerStyle,
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: '#55286F',
                                    }}
                                >
                                    <EnvelopeSimple size={20} weight="duotone" style={{ color: '#E1D7F3' }} />
                                </button>
                            </div>
                            <style>{`
                input::placeholder {
                  color: #B79BD4 !important;
                  font-style: italic !important;
                  font-family: 'Epilogue', sans-serif !important;
                }
              `}</style>
                        </form>
                    </Flex>
                </Flex>

                {/* Bottom Bar */}
                <Flex
                    direction={{ '@initial': 'column', '@md': 'row' }}
                    justify="between"
                    align="center"
                    gap="3"
                    style={{
                        paddingTop: '32px',
                        paddingLeft: '40px',
                        paddingRight: '40px',
                        borderTop: '1px solid #E1D7F3',
                    }}
                >
                    <Text
                        size="2"
                        style={{
                            fontFamily: 'Epilogue',
                            fontWeight: '300',
                            color: '#B79BD4',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        © {new Date().getFullYear()} Odyva. Fait avec <Heart size={16} weight="fill" style={{ color: '#55286F' }} /> au Maroc.
                    </Text>
                    <Text
                        size="2"
                        style={{
                            fontFamily: 'Epilogue',
                            fontWeight: '300',
                            color: '#B79BD4',
                        }}
                    >
                        Tous droits réservés.
                    </Text>
                </Flex>
            </Container>
        </Section>
    );
}
