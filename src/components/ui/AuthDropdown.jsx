import React from 'react';
import {
  DropdownMenu,
  Tabs,
  Flex,
  TextField,
  Button as RadixButton,
} from '@radix-ui/themes';
import { SignIn, List as ListIcon } from 'phosphor-react';
import { Button } from './Button';
import medusa from '../../lib/medusa';
import { useCart } from '../../context/CartContext';
import { OrderHistoryModal } from './OrderHistoryModal';

export function AuthDropdown() {
  const { assignCustomer, refreshCart } = useCart();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [customer, setCustomer] = React.useState(null);
  const [ordersOpen, setOrdersOpen] = React.useState(false);

  React.useEffect(() => {
    medusa.store
      .customer.retrieve()
      .then(({ customer }) => setCustomer(customer))
      .catch(() => setCustomer(null));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    setLoading(true);
    setError('');
    try {
      const { customer } = await medusa.auth.login("customer", "emailpass", { email, password });
      await assignCustomer(customer.id);
      await refreshCart();
      setCustomer(customer);
      setOpen(false);
    } catch (err) {
      setError('Login failed');
      console.error('Login failed', err);
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
      const { customer } = await medusa.auth.register(
        "customer",
        "emailpass",
        { email, password }
      );
      await assignCustomer(customer.id);
      await refreshCart();
      setCustomer(customer);
      setOpen(false);
    } catch (err) {
      setError('Signup failed');
      console.error('Signup failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await medusa.auth.deleteSession();
    setCustomer(null);
  };

  if (customer) {
    return (
      <>
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild>
            <Button icon={<ListIcon weight="duotone" />} iconPosition="right" cta>
              <span>{customer.email}</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content style={{
            padding: 'var(--space-3)',
            width: '240px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 50%, #E1D7F3 100%)',
            borderRadius: '8px 20px 8px 20px',
            border: '1px solid rgba(166, 141, 206, 0.3)',
            boxShadow: '0 8px 32px rgba(85, 40, 111, 0.15), 0 4px 16px rgba(183, 155, 212, 0.1)',
          }}>
            <DropdownMenu.Item
              onSelect={() => setOrdersOpen(true)}
              style={{
                borderRadius: '6px',
                padding: '10px 12px',
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: '400',
                color: '#55286F',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              Historique des commandes
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={handleLogout}
              style={{
                borderRadius: '6px',
                padding: '10px 12px',
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: '400',
                color: '#55286F',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              Se déconnecter
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <OrderHistoryModal open={ordersOpen} onOpenChange={setOrdersOpen} />
      </>
    );
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <Button icon={<SignIn weight="duotone" style={{ color: '#55286F' }} />} iconPosition="right" cta>
          <span>S'identifier</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={{
        padding: 'var(--space-4)',
        width: '300px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 50%, #E1D7F3 100%)',
        borderRadius: '8px 24px 8px 24px',
        border: '1px solid rgba(166, 141, 206, 0.3)',
        boxShadow: '0 8px 32px rgba(85, 40, 111, 0.15), 0 4px 16px rgba(183, 155, 212, 0.1)',
      }}>
        <Tabs.Root defaultValue="login">
          <Tabs.List mb="3" style={{
            background: 'linear-gradient(90deg, #E1D7F3 0%, #F9F9F9 100%)',
            borderRadius: '6px',
            padding: '4px',
          }}>
            <Tabs.Trigger value="login" style={{
              borderRadius: '4px',
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: '500',
              color: '#55286F',
            }}>Login</Tabs.Trigger>
            <Tabs.Trigger value="signup" style={{
              borderRadius: '4px',
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: '500',
              color: '#55286F',
            }}>Sign Up</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="login">
            <form onSubmit={handleLogin}>
              <Flex direction="column" gap="3">
                <TextField.Root
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  style={{
                    borderRadius: '6px',
                    border: '1px solid #E1D7F3',
                    background: '#FFFFFF',
                  }}
                />
                <TextField.Root
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  style={{
                    borderRadius: '6px',
                    border: '1px solid #E1D7F3',
                    background: '#FFFFFF',
                  }}
                />
                {error && (
                  <span style={{
                    color: '#E8A598',
                    fontSize: '12px',
                    fontFamily: 'Epilogue, sans-serif',
                    padding: '8px',
                    background: 'rgba(232, 165, 152, 0.1)',
                    borderRadius: '4px',
                  }}>{error}</span>
                )}
                <RadixButton
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #55286F 0%, #B79BD4 100%)',
                    color: '#FFFFFF',
                    borderRadius: '6px 18px 6px 18px',
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: '500',
                    padding: '10px 16px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(85, 40, 111, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? 'Connexion...' : 'Login'}
                </RadixButton>
              </Flex>
            </form>
          </Tabs.Content>
          <Tabs.Content value="signup">
            <form onSubmit={handleSignup}>
              <Flex direction="column" gap="3">
                <TextField.Root
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  style={{
                    borderRadius: '6px',
                    border: '1px solid #E1D7F3',
                    background: '#FFFFFF',
                  }}
                />
                <TextField.Root
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  style={{
                    borderRadius: '6px',
                    border: '1px solid #E1D7F3',
                    background: '#FFFFFF',
                  }}
                />
                {error && (
                  <span style={{
                    color: '#E8A598',
                    fontSize: '12px',
                    fontFamily: 'Epilogue, sans-serif',
                    padding: '8px',
                    background: 'rgba(232, 165, 152, 0.1)',
                    borderRadius: '4px',
                  }}>{error}</span>
                )}
                <RadixButton
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #55286F 0%, #B79BD4 100%)',
                    color: '#FFFFFF',
                    borderRadius: '6px 18px 6px 18px',
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: '500',
                    padding: '10px 16px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(85, 40, 111, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? 'Création...' : 'Sign Up'}
                </RadixButton>
              </Flex>
            </form>
          </Tabs.Content>
        </Tabs.Root>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

