import { Section, Heading, Flex, Text, Box, Button } from '@radix-ui/themes';
import { ProductCard } from '../ui/cards';
import { CaretLeft, CaretRight, ArrowSquareOut } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import decorationLeft from '../../assets/decoration-left.svg';
import decorationRight from '../../assets/decoration-right.svg';
import medusa from '../../lib/medusa';


const TitleCard = ({ onPrev, onNext }) => {
  const textContainerStyle = {
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
  };

  const iconContainerStyle = {
    background: 'linear-gradient(90deg, rgba(249, 249, 249, 0) 0%, #E1D7F3 100%)',
    padding: '16px 18px 16px 0',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const navButtonStyle = {
    backgroundColor: '#E1D7F3',
    color: '#55286F',
    borderRadius: '50%',
    padding: 'var(--space-2)',
    height: 'fit-content',
    boxShadow: '0 0 0 0.4px #A68DCE',
    cursor: 'pointer',
  };

  return (
    <Box style={{ width: '40%', flex: '0 0 auto', zIndex: 2 }}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F9F9F9',
          borderRadius: '8px 30px 8px 30px',
          boxShadow: '0 0 0 0.4px #A68DCE',
          padding: 'var(--space-6)',
          height: '100%',
        }}
      >
        <div>
          <Heading
            as="h3"
            size="6"
            style={{
              textAlign: 'left',
              marginBottom: 'var(--space-2)',
              fontFamily: 'Epilogue',
              fontWeight: '500',
              color: '#55286F',
            }}
          >
            Produits en vedette
          </Heading>
          <Text size="3" style={{ color: '#55286F', textAlign: 'left' }}>
            Profitez de notre pack de lancement à prix exceptionnel.
          </Text>
        </div>

        <Flex justify="center" gap="3" mt="4" style={{
          alignSelf: 'flex-end'
        }}>
          <Button variant="soft" onClick={onPrev} style={navButtonStyle}>
            <CaretLeft size={24} />
          </Button>
          <Button variant="soft" onClick={onNext} style={navButtonStyle}>
            <CaretRight size={24} />
          </Button>
        </Flex>

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
            overflow: 'hidden',
            marginTop: 'var(--space-6)',
            alignSelf: 'flex-end',
            cursor: 'pointer',
          }}
        >
          <a href="#categories" style={{ textDecoration: 'none', color: 'inherit' }}>
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
      </Box>
    </Box>
  );
};

export function FeaturedProductsCarousel() {
  const swiperRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    medusa.store.product
      .list({ limit: 10 })
      .then(({ products }) => setProducts(products))
      .catch((err) => console.error('Failed to fetch products', err));
  }, []);

  const scrollPrev = () => swiperRef.current?.slidePrev();
  const scrollNext = () => swiperRef.current?.slideNext();

  return (
    <Section
      id="featured-products"
      style={{
        padding: '48px 260px',
        position: 'relative',
        overflow: 'visible',
        // backgroundColor: '#F9F9F9',
        height: 'fit-content',
        width: '100%'
      }}
    >
      <img
        src={decorationLeft}
        alt=""
        style={{ position: 'absolute', left: 0, top: 0, height: '100%' }}
      />
      <img
        src={decorationRight}
        alt=""
        style={{ position: 'absolute', right: 0, top: 0, height: '100%' }}
      />

      <Flex style={{ overflow: 'visible', gap: '24px' }}>
        <TitleCard onPrev={scrollPrev} onNext={scrollNext} style={{
          zIndex: '999999',
        }} />
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView="auto"
          spaceBetween={24}
          style={{
            overflow: 'hidden',
            paddingBottom: 'var(--space-2)',
            paddingTop: 'var(--space-2)',
            flex: '1 1 auto',
            width: '100%',
            paddingLeft: '8px',
            paddingRight: '160px',
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} style={{ width: 'auto' }}>
              <ProductCard
                image={product.thumbnail}
                name={product.title}
                price={
                  product.variants?.[0]?.prices?.[0]?.amount
                    ? product.variants[0].prices[0].amount / 100
                    : 'N/A'
                }
                variantId={product.variants?.[0]?.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </Section>
  );
};