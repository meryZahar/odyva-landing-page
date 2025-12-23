import { Section, Heading, Flex, Button } from '@radix-ui/themes';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRef } from 'react';
import { ReviewCard } from '../ui/cards';
import reviews from "../../data/reviews";

const navButtonStyle = {
  backgroundColor: '#E1D7F3',
  color: '#55286F',
  borderRadius: '50%',
  padding: 'var(--space-2)',
  height: 'fit-content',
  boxShadow: '0 0 0 0.4px #A68DCE',
  cursor: 'pointer',
};

export function ReviewsSection() {
  const swiperRef = useRef(null);

  const scrollPrev = () => swiperRef.current?.slidePrev();
  const scrollNext = () => swiperRef.current?.slideNext();

  return (
    <Section
      id="reviews"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '40px 260px',
        width: '100%',
        height: 'fit-content',
      }}
    >
      <Flex justify="between" align="center">
        <Heading
          as="h3"
          size="6"
          style={{
            fontFamily: 'Epilogue',
            fontWeight: '500',
            color: '#55286F',
          }}
        >
          Avis
        </Heading>
        <Flex gap="3">
          <Button variant="soft" onClick={scrollPrev} style={navButtonStyle}>
            <CaretLeft size={24} />
          </Button>
          <Button variant="soft" onClick={scrollNext} style={navButtonStyle}>
            <CaretRight size={24} />
          </Button>
        </Flex>
      </Flex>
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
          width: '100%',
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} style={{ width: 'auto' }}>
            <ReviewCard {...review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}