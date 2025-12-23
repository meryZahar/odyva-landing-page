import { Section } from '@radix-ui/themes';
import { PromotionCard } from '../ui/cards';

export function PromotionSection() {
  return (
    <Section
      id="promotion"
      style={{
        position: 'relative',
        paddingBottom: '360px',
      }}
    >
      <PromotionCard />
    </Section>
  );
}