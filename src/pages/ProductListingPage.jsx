import { Theme, Section, Container, Flex, Heading, Text, Select } from '@radix-ui/themes';
import { NavBar, Footer } from '../components/layout';
import { ProductCard } from '../components/ui/cards';
import { Filters } from '../components/ui/Filters';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import medusa from '../lib/medusa';
import { House, CaretRight } from 'phosphor-react';

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedVolumes, setSelectedVolumes] = useState([]);
  const [sortBy, setSortBy] = useState('name-asc');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || undefined;

  useEffect(() => {
    medusa.store.product
      .list({ q, limit: 100 })
      .then(({ products }) => setProducts(products))
      .catch((err) => console.error('Failed to fetch products', err));
  }, [q]);

  useEffect(() => {
    medusa.store.category
      .list()
      .then(({ product_categories }) => setCategories(product_categories))
      .catch((err) => console.error('Failed to fetch categories', err));
  }, []);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleVolume = (v) => {
    setSelectedVolumes((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const volumes = [30, 50, 500];

  const filtered = products.filter((p) => {
    const variant = p.variants?.[0];
    const price = variant?.prices?.[0]?.amount / 100 || 0;
    const passPrice = price >= priceRange[0] && price <= priceRange[1];
    const passCategory =
      !selectedCategories.length ||
      p.categories?.some((c) => selectedCategories.includes(c.id));
    const volume = Number(p.metadata?.volume);
    const passVolume =
      !selectedVolumes.length || selectedVolumes.includes(volume);
    return passPrice && passCategory && passVolume;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    const priceA = a.variants?.[0]?.prices?.[0]?.amount / 100 || 0;
    const priceB = b.variants?.[0]?.prices?.[0]?.amount / 100 || 0;

    switch (sortBy) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'name-asc':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <Theme
      accentColor="purple"
      style={{ background: 'linear-gradient(135deg, #E1D7F3 0%, #F9F9F9 100%)', minHeight: '100vh' }}
    >
      <NavBar />

      {/* Breadcrumbs */}
      <Container style={{ paddingTop: '120px', paddingLeft: '40px', paddingRight: '40px' }}>
        <Flex align="center" gap="2" style={{ marginBottom: '24px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <House size={16} weight="duotone" style={{ color: '#B79BD4' }} />
          </a>
          <CaretRight size={12} weight="bold" style={{ color: '#B79BD4' }} />
          <Text size="2" style={{ fontFamily: 'Epilogue', fontWeight: '300', color: '#55286F' }}>
            Boutique
          </Text>
        </Flex>
      </Container>

      {/* Hero Section */}
      <Section
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
          textAlign: 'left',
          color: '#55286F'
        }}
      >
        <Container>
          <Heading
            as="h1"
            size="9"
            style={{ fontFamily: 'Caveat', fontWeight: 400, marginBottom: 'var(--space-4)' }}
          >
            Des soins ciblés, des résultats visibles
          </Heading>
          <Text
            size="4"
            style={{ maxWidth: '640px', lineHeight: 1.6 }}
          >
            Chaque produit Odyva est pensé pour un usage précis, avec des actifs naturels efficaces.
          </Text>
        </Container>
      </Section>

      {/* Main Section */}
      <Container style={{ paddingBottom: '60px' }}>
        <Flex
          style={{
            paddingLeft: '40px',
            paddingRight: '40px',
            display: 'flex',
            gap: 'var(--space-6)',
          }}
        >
          {/* Shop Filters */}
          <Filters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            volumes={volumes}
            selectedVolumes={selectedVolumes}
            toggleVolume={toggleVolume}
          />

          {/* Products Grid */}
          <Flex
            direction="column"
            style={{ flex: 1, width: '100%' }}
          >
            {/* Controls Bar */}
            <Flex justify="between" align="center" style={{ marginBottom: 'var(--space-4)' }}>
              <Text size="2" style={{ fontFamily: 'Epilogue', fontWeight: '300', color: '#B79BD4' }}>
                {sorted.length} {sorted.length === 1 ? 'produit trouvé' : 'produits trouvés'}
              </Text>

              <Flex align="center" gap="2">
                <Text size="2" style={{ fontFamily: 'Epilogue', fontWeight: '300', color: '#B79BD4' }}>
                  Trier par:
                </Text>
                <Select.Root value={sortBy} onValueChange={setSortBy}>
                  <Select.Trigger
                    style={{
                      fontFamily: 'Epilogue',
                      fontSize: '14px',
                      fontWeight: '300',
                      color: '#55286F',
                      backgroundColor: '#F9F9F9',
                      border: '1px solid #E1D7F3',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                    }}
                  />
                  <Select.Content style={{ backgroundColor: '#F9F9F9', border: '1px solid #E1D7F3' }}>
                    <Select.Item value="name-asc" style={{ fontFamily: 'Epilogue', fontSize: '14px', color: '#55286F' }}>Nom (A-Z)</Select.Item>
                    <Select.Item value="name-desc" style={{ fontFamily: 'Epilogue', fontSize: '14px', color: '#55286F' }}>Nom (Z-A)</Select.Item>
                    <Select.Item value="price-asc" style={{ fontFamily: 'Epilogue', fontSize: '14px', color: '#55286F' }}>Prix (bas - haut)</Select.Item>
                    <Select.Item value="price-desc" style={{ fontFamily: 'Epilogue', fontSize: '14px', color: '#55286F' }}>Prix (haut - bas)</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Flex>

            {/* Products Grid or Empty State */}
            {sorted.length > 0 ? (
              <Flex
                wrap="wrap"
                gap="3"
                style={{ width: '100%' }}
              >
                {sorted.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.thumbnail}
                    name={product.title}
                    price={
                      product.variants?.[0]?.prices?.[0]?.amount
                        ? product.variants[0].prices[0].amount / 100
                        : 'N/A'
                    }
                    variantId={product.variants?.[0]?.id}
                  />
                ))}
              </Flex>
            ) : (
              <Flex
                direction="column"
                align="center"
                justify="center"
                style={{
                  padding: '80px 40px',
                  backgroundColor: '#F9F9F9',
                  borderRadius: '8px 30px 8px 30px',
                  border: '1px solid #E1D7F3',
                }}
              >
                <Heading
                  size="6"
                  style={{
                    fontFamily: 'Epilogue',
                    fontWeight: '500',
                    color: '#55286F',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Aucun produit trouvé
                </Heading>
                <Text
                  size="3"
                  style={{
                    fontFamily: 'Epilogue',
                    fontWeight: '300',
                    color: '#B79BD4',
                    textAlign: 'center',
                    maxWidth: '400px',
                  }}
                >
                  Essayez d'ajuster vos filtres ou votre recherche pour trouver ce que vous cherchez.
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Container>

      <Footer />
    </Theme>
  );
};