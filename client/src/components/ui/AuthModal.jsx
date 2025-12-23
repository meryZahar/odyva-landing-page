import React from 'react';
import {
    Dialog,
    Flex,
    Button as RadixButton,
} from '@radix-ui/themes';
import { SignIn, X, Envelope, LockKey } from 'phosphor-react';
import { Button } from './Button';
import medusa from '../../lib/medusa';
import { useCart } from '../../context/CartContext';
import { OrderHistoryModal } from './OrderHistoryModal';

// Toggle Switch Component
function ToggleSwitch({ value, onChange }) {
    return (
        <div style={{
            display: 'flex',
            background: '#E1D7F3',
            borderRadius: '99px',
            padding: '4px',
            gap: '4px',
        }}>
            <button
                type="button"
                onClick={() => onChange('login')}
                style={{
                    flex: 1,
                    padding: '8px 24px',
                    borderRadius: '99px',
                    border: 'none',
                    background: value === 'login' ? '#B79BD4' : 'transparent',
                    color: '#55286F',
                    fontFamily: 'Epilogue, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                }}
            >
                Connexion
            </button>
            <button
                type="button"
                onClick={() => onChange('signup')}
                style={{
                    flex: 1,
                    padding: '8px 24px',
                    borderRadius: '99px',
                    border: 'none',
                    background: value === 'signup' ? '#B79BD4' : 'transparent',
                    color: '#55286F',
                    fontFamily: 'Epilogue, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                }}
            >
                Inscription
            </button>
        </div>
    );
}

// Contact form-style input
const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 0 0.4px rgba(166, 141, 206, 0.3)',
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
    width: '100%',
    borderRadius: '12px 4px 12px 4px',
    height: '48px',
};

const iconContainerStyle = {
    background: 'linear-gradient(90deg, #E1D7F3 0%, rgba(249, 249, 249, 0) 100%)',
    padding: '0 16px',
    height: '100%',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const textContainerStyle = {
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
};

const inputStyle = {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '16px',
    color: '#55286F',
    fontWeight: '300',
    width: '100%',
    padding: '0',
    height: '100%',
    fontFamily: 'Epilogue, sans-serif',
};

export function AuthModal() {
    const { assignCustomer, refreshCart } = useCart();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [customer, setCustomer] = React.useState(null);
    const [ordersOpen, setOrdersOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('login');

    React.useEffect(() => {
        medusa.store
            .customer.retrieve()
            .then(({ customer }) => setCustomer(customer))
            .catch(() => setCustomer(null));
    }, []);

    // Add placeholder styling
    React.useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      input::placeholder {
        color: #B79BD4 !important;
        font-style: italic !important;
        font-family: 'Epilogue', sans-serif !important;
      }
    `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email').toString().trim();
        const password = data.get('password');

        console.log('Attempting login for:', email);
        setLoading(true);
        setError('');

        try {
            const loginResponse = await medusa.auth.login("customer", "emailpass", { email, password });
            console.log('Login successful, response:', loginResponse);

            // Extract token from response (it might be directly the token or in a property)
            const token = loginResponse.token || loginResponse.access_token || (typeof loginResponse === 'string' ? loginResponse : null);

            if (!token) {
                console.warn('No token found in login response');
            } else {
                console.log('Token found, attempting to use it for retrieval');
                // Try to set it globally if possible (speculative for this SDK version)
                // @ts-ignore
                if (medusa.client && medusa.client.headers) {
                    // @ts-ignore
                    medusa.client.headers.Authorization = `Bearer ${token}`;
                }
            }

            // Pass the token explicitly in headers for the retrieve call
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const { customer } = await medusa.store.customer.retrieve(null, headers);

            if (!customer) {
                throw new Error("Failed to retrieve customer details after login");
            }

            console.log('Customer retrieved:', customer.id);

            await assignCustomer(customer.id);
            await refreshCart();
            setCustomer(customer);
            setOpen(false);
        } catch (err) {
            console.error('Login failed details:', err);
            // Log more details if available in the error object
            if (err.response) {
                console.error('Error response:', err.response.status, err.response.data);
            }
            setError('Login failed: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        setLoading(true);
        setError('');
        try {
            // Register the user (creates identity)
            await medusa.auth.register(
                "customer",
                "emailpass",
                { email, password }
            );

            // Immediately login to get the customer session and details
            // This is required because register() might not return the customer object in V2
            const { customer } = await medusa.auth.login("customer", "emailpass", { email, password });

            if (!customer) {
                throw new Error("Failed to retrieve customer after signup");
            }

            await assignCustomer(customer.id);
            await refreshCart();
            setCustomer(customer);
            setOpen(false);
        } catch (err) {
            console.error('Signup failed', err);
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await medusa.auth.deleteSession();
        setCustomer(null);
        setOpen(false);
    };

    if (customer) {
        return (
            <>
                <Button
                    icon={<SignIn weight="duotone" />}
                    onClick={() => setOpen(true)}
                >
                    <span>{customer.email.split('@')[0]}</span>
                </Button>

                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Content
                        style={{
                            maxWidth: '420px',
                            background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 50%, #E1D7F3 100%)',
                            borderRadius: '8px 24px 8px 24px',
                            border: '1px solid rgba(166, 141, 206, 0.4)',
                            boxShadow: '0 8px 32px rgba(85, 40, 111, 0.15), 0 4px 16px rgba(183, 155, 212, 0.1)',
                            padding: '32px',
                        }}
                    >
                        <Flex direction="column" gap="5">
                            <Flex justify="between" align="center">
                                <Dialog.Title style={{
                                    color: '#55286F',
                                    fontFamily: 'Epilogue, sans-serif',
                                    fontWeight: '500',
                                    margin: 0,
                                }}>
                                    Mon compte
                                </Dialog.Title>
                                <Dialog.Close>
                                    <button
                                        style={{
                                            all: 'unset',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: '#E1D7F3',
                                            border: '1px solid rgba(166, 141, 206, 0.4)',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#55286F';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 40, 111, 0.2)';
                                            e.currentTarget.querySelector('svg').style.color = '#FFFFFF';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = '#E1D7F3';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.querySelector('svg').style.color = '#55286F';
                                        }}
                                    >
                                        <X size={20} weight="bold" style={{ color: '#55286F', transition: 'color 0.2s ease' }} />
                                    </button>
                                </Dialog.Close>
                            </Flex>

                            <Flex direction="column" gap="4" style={{ marginTop: '24px' }}>
                                <div style={{
                                    padding: '16px',
                                    background: 'rgba(225, 215, 243, 0.3)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(166, 141, 206, 0.2)',
                                }}>
                                    <p style={{ margin: 0, color: '#55286F', fontSize: '14px', fontFamily: 'Epilogue, sans-serif' }}>
                                        <strong>Email:</strong> {customer.email}
                                    </p>
                                </div>

                                <RadixButton
                                    onClick={() => {
                                        setOrdersOpen(true);
                                        setOpen(false);
                                    }}
                                    style={{
                                        background: '#E1D7F3',
                                        color: '#55286F',
                                        borderRadius: '6px 18px 6px 18px',
                                        border: '1px solid rgba(166, 141, 206, 0.4)',
                                        cursor: 'pointer',
                                        padding: '12px 24px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        fontFamily: 'Epilogue, sans-serif',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 40, 111, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    📦 Mes commandes
                                </RadixButton>

                                <RadixButton
                                    onClick={handleLogout}
                                    style={{
                                        background: '#55286F',
                                        color: '#FFFFFF',
                                        borderRadius: '6px 18px 6px 18px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '12px 24px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        fontFamily: 'Epilogue, sans-serif',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 40, 111, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    Déconnexion
                                </RadixButton>
                            </Flex>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>

                <OrderHistoryModal open={ordersOpen} onOpenChange={setOrdersOpen} />
            </>
        );
    }

    return (
        <>
            <Button
                icon={<SignIn weight="duotone" />}
                onClick={() => setOpen(true)}
            >
                <span>S'identifier</span>
            </Button>

            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Content
                    style={{
                        maxWidth: '420px',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 50%, #E1D7F3 100%)',
                        borderRadius: '8px 24px 8px 24px',
                        border: '1px solid rgba(166, 141, 206, 0.4)',
                        boxShadow: '0 8px 32px rgba(85, 40, 111, 0.15), 0 4px 16px rgba(183, 155, 212, 0.1)',
                        padding: '32px',
                    }}
                >
                    <Flex direction="column" gap="5">
                        <Flex justify="between" align="center">
                            <Dialog.Title style={{
                                color: '#55286F',
                                fontFamily: 'Epilogue, sans-serif',
                                fontWeight: '500',
                                margin: 0,
                            }}>
                                Connexion
                            </Dialog.Title>
                            <Dialog.Close>
                                <button
                                    style={{
                                        all: 'unset',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: '#E1D7F3',
                                        border: '1px solid rgba(166, 141, 206, 0.4)',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#55286F';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 40, 111, 0.2)';
                                        e.currentTarget.querySelector('svg').style.color = '#FFFFFF';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#E1D7F3';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.querySelector('svg').style.color = '#55286F';
                                    }}
                                >
                                    <X size={20} weight="bold" style={{ color: '#55286F', transition: 'color 0.2s ease' }} />
                                </button>
                            </Dialog.Close>
                        </Flex>

                        {/* Title Separator */}
                        <div style={{
                            width: '100%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent 0%, rgba(166, 141, 206, 0.4) 50%, transparent 100%)',
                            margin: '8px 0 16px 0'
                        }} />

                        {/* Toggle Switch */}
                        <div style={{ marginTop: '8px' }}>
                            <ToggleSwitch value={activeTab} onChange={setActiveTab} />
                        </div>

                        {/* Login Form */}
                        {activeTab === 'login' && (
                            <form onSubmit={handleLogin}>
                                <Flex direction="column" gap="4">
                                    {/* Email Input */}
                                    <div style={inputContainerStyle}>
                                        <div style={iconContainerStyle}>
                                            <Envelope size={20} weight="duotone" style={{ color: '#A68DCE' }} />
                                        </div>
                                        <div style={{
                                            width: '1px',
                                            height: '24px',
                                            background: 'linear-gradient(180deg, #F9F9F9 0%, #A68DCE 50%, #F9F9F9 100%)'
                                        }}></div>
                                        <div style={textContainerStyle}>
                                            <input
                                                name="email"
                                                placeholder="Email"
                                                type="email"
                                                required
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div style={inputContainerStyle}>
                                        <div style={iconContainerStyle}>
                                            <LockKey size={20} weight="duotone" style={{ color: '#A68DCE' }} />
                                        </div>
                                        <div style={{
                                            width: '1px',
                                            height: '24px',
                                            background: 'linear-gradient(180deg, #F9F9F9 0%, #A68DCE 50%, #F9F9F9 100%)'
                                        }}></div>
                                        <div style={textContainerStyle}>
                                            <input
                                                name="password"
                                                placeholder="Mot de passe"
                                                type="password"
                                                required
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <p style={{
                                            margin: 0,
                                            padding: '8px 12px',
                                            background: 'rgba(232, 165, 152, 0.2)',
                                            borderRadius: '6px',
                                            color: '#E8A598',
                                            fontSize: '14px',
                                            fontFamily: 'Epilogue, sans-serif',
                                        }}>
                                            {error}
                                        </p>
                                    )}

                                    <RadixButton
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            background: '#55286F',
                                            color: '#E1D7F3',
                                            borderRadius: '6px 22px 6px 22px',
                                            fontSize: '16px',
                                            fontWeight: '300',
                                            fontFamily: 'Epilogue, sans-serif',
                                            padding: '0 24px',
                                            height: '48px',
                                            boxShadow: '0 0 0 0.4px #55286F',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            border: 'none',
                                            marginTop: '8px',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!loading) {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 40, 111, 0.2)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 0 0 0.4px #55286F';
                                        }}
                                    >
                                        {loading ? 'Connexion...' : 'Se connecter'}
                                    </RadixButton>
                                </Flex>
                            </form>
                        )}

                        {/* Signup Form */}
                        {activeTab === 'signup' && (
                            <form onSubmit={handleSignup}>
                                <Flex direction="column" gap="4">
                                    {/* Email Input */}
                                    <div style={inputContainerStyle}>
                                        <div style={iconContainerStyle}>
                                            <Envelope size={20} weight="duotone" style={{ color: '#A68DCE' }} />
                                        </div>
                                        <div style={{
                                            width: '1px',
                                            height: '24px',
                                            background: 'linear-gradient(180deg, #F9F9F9 0%, #A68DCE 50%, #F9F9F9 100%)'
                                        }}></div>
                                        <div style={textContainerStyle}>
                                            <input
                                                name="email"
                                                placeholder="Email"
                                                type="email"
                                                required
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div style={inputContainerStyle}>
                                        <div style={iconContainerStyle}>
                                            <LockKey size={20} weight="duotone" style={{ color: '#A68DCE' }} />
                                        </div>
                                        <div style={{
                                            width: '1px',
                                            height: '24px',
                                            background: 'linear-gradient(180deg, #F9F9F9 0%, #A68DCE 50%, #F9F9F9 100%)'
                                        }}></div>
                                        <div style={textContainerStyle}>
                                            <input
                                                name="password"
                                                placeholder="Mot de passe"
                                                type="password"
                                                required
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <p style={{
                                            margin: 0,
                                            padding: '8px 12px',
                                            background: 'rgba(232, 165, 152, 0.2)',
                                            borderRadius: '6px',
                                            color: '#E8A598',
                                            fontSize: '14px',
                                            fontFamily: 'Epilogue, sans-serif',
                                        }}>
                                            {error}
                                        </p>
                                    )}

                                    <RadixButton
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            background: '#55286F',
                                            color: '#E1D7F3',
                                            borderRadius: '6px 22px 6px 22px',
                                            fontSize: '16px',
                                            fontWeight: '300',
                                            fontFamily: 'Epilogue, sans-serif',
                                            padding: '0 24px',
                                            height: '48px',
                                            boxShadow: '0 0 0 0.4px #55286F',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            border: 'none',
                                            marginTop: '8px',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!loading) {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 40, 111, 0.2)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 0 0 0.4px #55286F';
                                        }}
                                    >
                                        {loading ? 'Création...' : "S'inscrire"}
                                    </RadixButton>
                                </Flex>
                            </form>
                        )}
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
}
