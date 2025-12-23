import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  TextField,
  Button,
  Card,
  Badge,
} from '@radix-ui/themes';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const {
    cart,
    updateAddress,
    getShippingOptions,
    addShippingMethod,
    initializePaymentSession,
    completeCart,
  } = useCart();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // Step 1: Contact & Address
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [address, setAddress] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    city: '',
    postal_code: ''
  });

  // Step 2: Shipping
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);

  const contactComplete = contact.email && contact.phone;
  const addressComplete = address.first_name && address.last_name && address.address_1 && address.city && address.postal_code;
  const canStep1Continue = contactComplete && addressComplete;

  const handleContinueToShipping = async () => {
    setLoading(true);
    setError(null);
    try {
      // Update cart with address
      await updateAddress(contact.email, contact.phone, address);

      // Fetch shipping options
      const options = await getShippingOptions();
      setShippingOptions(options);

      setStep(1);
    } catch (err) {
      setError('Failed to update address. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToPayment = async () => {
    if (!selectedShipping) {
      setError('Please select a shipping method');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Add shipping method to cart
      await addShippingMethod(selectedShipping);

      // Initialize payment session (using manual provider for now)
      await initializePaymentSession('manual');

      setStep(2);
    } catch (err) {
      setError('Failed to set shipping method. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await completeCart();
      setOrder(result.order);
      setStep(3);
    } catch (err) {
      setError('Failed to complete order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const formatPrice = (amount) => {
    return amount ? (amount / 100).toFixed(2) : '0.00';
  };

  return (
    <Flex style={{ padding: '40px', gap: '40px' }}>
      <Box style={{ flex: 1 }}>
        <Heading as="h1" style={{ color: '#55286F', marginBottom: '24px' }}>
          Checkout
        </Heading>

        {error && (
          <Card style={{ marginBottom: '20px', backgroundColor: '#fee', padding: '12px' }}>
            <Text style={{ color: '#c00' }}>{error}</Text>
          </Card>
        )}

        {/* Step 1: Contact & Address */}
        {step === 0 && (
          <>
            <Heading as="h2" size="4" mb="3" style={{ color: '#55286F' }}>
              1) Contact et localisation
            </Heading>

            <Box mb="4">
              <Heading as="h3" size="3" style={{ color: '#55286F' }}>
                Contact
              </Heading>
              <Flex direction="column" gap="3" mt="2">
                <TextField.Root
                  placeholder="Email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                />
                <TextField.Root
                  placeholder="Téléphone"
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                />
              </Flex>
            </Box>

            {contactComplete && (
              <Box mb="4">
                <Heading as="h3" size="3" style={{ color: '#55286F' }}>
                  Localisation
                </Heading>
                <Flex direction="column" gap="3" mt="2">
                  <TextField.Root
                    placeholder="Prénom"
                    value={address.first_name}
                    onChange={(e) =>
                      setAddress({ ...address, first_name: e.target.value })
                    }
                  />
                  <TextField.Root
                    placeholder="Nom"
                    value={address.last_name}
                    onChange={(e) =>
                      setAddress({ ...address, last_name: e.target.value })
                    }
                  />
                  <TextField.Root
                    placeholder="Adresse"
                    value={address.address_1}
                    onChange={(e) =>
                      setAddress({ ...address, address_1: e.target.value })
                    }
                  />
                  <TextField.Root
                    placeholder="Ville"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                  <TextField.Root
                    placeholder="Code Postal"
                    value={address.postal_code}
                    onChange={(e) =>
                      setAddress({ ...address, postal_code: e.target.value })
                    }
                  />
                </Flex>
              </Box>
            )}

            <Button
              disabled={!canStep1Continue || loading}
              onClick={handleContinueToShipping}
            >
              {loading ? 'Chargement...' : 'Continuer'}
            </Button>
          </>
        )}

        {/* Step 2: Shipping & Payment */}
        {step === 1 && (
          <>
            <Heading as="h2" size="4" mb="3" style={{ color: '#55286F' }}>
              2) Livraison et paiement
            </Heading>

            <Box mb="4">
              <Heading as="h3" size="3" mb="2" style={{ color: '#55286F' }}>
                Options de livraison
              </Heading>

              {shippingOptions.length === 0 ? (
                <Text>Aucune option de livraison disponible</Text>
              ) : (
                <Flex direction="column" gap="2">
                  {shippingOptions.map((option) => (
                    <Card
                      key={option.id}
                      style={{
                        padding: '12px',
                        cursor: 'pointer',
                        border: selectedShipping === option.id ? '2px solid #55286F' : '1px solid #E1D7F3',
                        backgroundColor: selectedShipping === option.id ? '#F9F9F9' : 'white',
                      }}
                      onClick={() => setSelectedShipping(option.id)}
                    >
                      <Flex justify="between" align="center">
                        <Box>
                          <Text weight="bold" style={{ color: '#55286F' }}>
                            {option.name}
                          </Text>
                          {option.description && (
                            <Text size="2" style={{ color: '#B79BD4' }}>
                              {option.description}
                            </Text>
                          )}
                        </Box>
                        <Text weight="bold" style={{ color: '#55286F' }}>
                          {formatPrice(option.amount)} MAD
                        </Text>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              )}
            </Box>

            <Box mb="4">
              <Heading as="h3" size="3" mb="2" style={{ color: '#55286F' }}>
                Paiement
              </Heading>
              <Card style={{ padding: '12px' }}>
                <Flex align="center" gap="2">
                  <Badge color="purple">Paiement à la livraison</Badge>
                  <Text size="2" style={{ color: '#B79BD4' }}>
                    Vous paierez lors de la réception
                  </Text>
                </Flex>
              </Card>
            </Box>

            <Flex gap="2" mt="4">
              <Button variant="surface" onClick={handleBack} disabled={loading}>
                Retour
              </Button>
              <Button onClick={handleContinueToPayment} disabled={loading}>
                {loading ? 'Chargement...' : 'Continuer'}
              </Button>
            </Flex>
          </>
        )}

        {/* Step 3: Review & Complete */}
        {step === 2 && (
          <>
            <Heading as="h2" size="4" mb="3" style={{ color: '#55286F' }}>
              3) Confirmation
            </Heading>

            <Box mb="4">
              <Text style={{ color: '#55286F', marginBottom: '16px' }}>
                Veuillez vérifier votre commande avant de finaliser.
              </Text>

              <Card style={{ padding: '16px', marginBottom: '16px' }}>
                <Heading as="h4" size="2" mb="2" style={{ color: '#55286F' }}>
                  Informations de contact
                </Heading>
                <Text size="2">{contact.email}</Text>
                <Text size="2">{contact.phone}</Text>
              </Card>

              <Card style={{ padding: '16px', marginBottom: '16px' }}>
                <Heading as="h4" size="2" mb="2" style={{ color: '#55286F' }}>
                  Adresse de livraison
                </Heading>
                <Text size="2">{address.first_name} {address.last_name}</Text>
                <Text size="2">{address.address_1}</Text>
                <Text size="2">{address.city}, {address.postal_code}</Text>
              </Card>
            </Box>

            <Flex gap="2" mt="4">
              <Button variant="surface" onClick={handleBack} disabled={loading}>
                Retour
              </Button>
              <Button onClick={handleCompleteOrder} disabled={loading}>
                {loading ? 'Finalisation...' : 'Confirmer la commande'}
              </Button>
            </Flex>
          </>
        )}

        {/* Step 4: Success */}
        {step === 3 && order && (
          <>
            <Heading as="h2" size="4" mb="3" style={{ color: '#55286F' }}>
              ✓ Commande confirmée
            </Heading>

            <Card style={{ padding: '20px', backgroundColor: '#e8f5e9' }}>
              <Heading as="h3" size="3" mb="2" style={{ color: '#2e7d32' }}>
                Merci pour votre commande !
              </Heading>
              <Text style={{ color: '#2e7d32' }}>
                Numéro de commande: <strong>{order.display_id}</strong>
              </Text>
              <Text size="2" style={{ color: '#558b2f', marginTop: '8px' }}>
                Vous recevrez un email de confirmation à {contact.email}
              </Text>
            </Card>

            <Button
              asChild
              style={{ marginTop: '20px' }}
              variant="surface"
            >
              <a href="/">Retour à l'accueil</a>
            </Button>
          </>
        )}
      </Box>

      {/* Cart Summary Sidebar */}
      <Box style={{ width: '300px' }}>
        <Heading as="h3" size="4" mb="3" style={{ color: '#55286F' }}>
          Récapitulatif
        </Heading>

        {!cart && <Text>Chargement du panier...</Text>}

        {cart && (
          <Card style={{ padding: '16px' }}>
            <Box mb="3">
              {cart.items?.map((item) => (
                <Flex key={item.id} justify="between" mb="2">
                  <Text size="2">{item.title} x {item.quantity}</Text>
                  <Text size="2" weight="bold">
                    {formatPrice(item.unit_price * item.quantity)} MAD
                  </Text>
                </Flex>
              ))}
            </Box>

            <Box style={{ borderTop: '1px solid #E1D7F3', paddingTop: '12px' }}>
              <Flex justify="between" mb="1">
                <Text size="2">Sous-total</Text>
                <Text size="2">{formatPrice(cart.subtotal)} MAD</Text>
              </Flex>

              {cart.shipping_total > 0 && (
                <Flex justify="between" mb="1">
                  <Text size="2">Livraison</Text>
                  <Text size="2">{formatPrice(cart.shipping_total)} MAD</Text>
                </Flex>
              )}

              <Flex justify="between" mt="2" style={{ borderTop: '1px solid #E1D7F3', paddingTop: '8px' }}>
                <Text weight="bold">Total</Text>
                <Text weight="bold" style={{ color: '#55286F' }}>
                  {formatPrice(cart.total)} MAD
                </Text>
              </Flex>
            </Box>
          </Card>
        )}
      </Box>
    </Flex>
  );
}
