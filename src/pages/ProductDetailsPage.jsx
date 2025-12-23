import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes';
import medusa from '../lib/medusa';
import { useCart } from '../context/CartContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    medusa.store.product
      .retrieve(id)
      .then(({ product }) => setProduct(product))
      .catch((err) => console.error('Failed to fetch product', err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const variant = product.variants?.[0];
  const price = variant?.prices?.[0]?.amount
    ? variant.prices[0].amount / 100
    : 'N/A';

  return (
    <Box style={{ padding: '40px' }}>
      <Flex gap="6">
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ maxWidth: '400px', objectFit: 'contain' }}
        />
        <Flex direction="column" gap="4" align="start">
          <Heading as="h1" style={{ color: '#55286F' }}>
            {product.title}
          </Heading>
          <Text>{price} MAD</Text>
          <Button onClick={() => addItem(variant?.id)}>Add to cart</Button>
        </Flex>
      </Flex>
    </Box>
  );
}
