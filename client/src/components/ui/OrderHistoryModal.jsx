import React from 'react';
import { Dialog, Flex, Text } from '@radix-ui/themes';
import medusa from '../../lib/medusa';

export function OrderHistoryModal({ open, onOpenChange }) {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    if (open) {
      medusa.customers
        .listOrders()
        .then(({ orders }) => setOrders(orders))
        .catch((err) => console.error('Failed to fetch orders', err));
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: '480px' }}>
        <Dialog.Title>Historique des commandes</Dialog.Title>
        <Flex direction="column" gap="2" mt="4">
          {orders.length ? (
            orders.map((o) => (
              <Text key={o.id} style={{ color: '#55286F' }}>
                Commande #{o.display_id} - {o.total / 100} MAD
              </Text>
            ))
          ) : (
            <Text style={{ color: '#55286F' }}>Aucune commande</Text>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
