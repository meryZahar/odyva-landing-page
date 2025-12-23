import { Section, Heading, Flex, Text, Button } from '@radix-ui/themes';
import { CategoryCard } from '../ui/cards';
import { ArrowSquareOut } from 'phosphor-react';
import { useEffect, useState } from 'react';
import medusa from '../../lib/medusa';

export function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    medusa.store.category
      .list()
      .then(({ product_categories }) => setCategories(product_categories))
      .catch((err) => console.error('Failed to fetch categories', err));
  }, []);

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
    <Section id="categories" style={{ padding: '40px 260px' }}>
      <Flex align="start" justify="between" gap="6" style={{
        width: '100%'
      }}>
        <Flex gap="4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              image={category.metadata?.image}
              name={category.name}
              gradientStartColor={category.metadata?.gradient}
            />
          ))}
        </Flex>
        <Flex direction="column" align="end" style={{
          textAlign: 'right',
          gap: '16px',
          width: '480px'
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
            Catégories
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
            Découvrez nos univers de beauté
          </Text>
          <Button
            asChild
            variant="surface"
            style={{
              background: '#F9F9F9',
              color: '#55286F',
              borderRadius: '6px 22px 6px 22px',
              boxShadow: '0 0 0 0.4px #A68DCE',
              fontSize: '18px',
              fontWeight: '300',
              height: 'fit-content',
              width: 'fit-content',
              padding: 0,
              overflow: 'hidden'
            }}
          >
            <a href="#promotion" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={textContainerStyle}>
                  <span>Voir l'Offre</span>
                </div>
                <div style={iconContainerStyle}>
                  <ArrowSquareOut size={18} weight="duotone" style={{ color: '#B79BD4' }} />
                </div>
              </div>
            </a>
          </Button>
        </Flex>
      </Flex>
    </Section>
  );
}