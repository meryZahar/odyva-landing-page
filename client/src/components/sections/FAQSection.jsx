import { Section, Heading, Text } from '@radix-ui/themes';
import { Accordion } from "radix-ui";
import { CaretDown } from 'phosphor-react';

const faqs = [
  {
    question: 'Quels sont vos délais de livraison ?',
    answer: 'Nos livraisons prennent généralement entre 3 et 5 jours ouvrés.'
  },
  {
    question: 'Vos produits sont-ils certifiés bio ?',
    answer: 'Oui, tous nos soins sont élaborés à partir d\'ingrédients certifiés biologiques.'
  },
  {
    question: 'Comment suivre ma commande ?',
    answer: 'Un lien de suivi est envoyé par e-mail dès l\'expédition de votre commande.'
  }
];

export function FAQSection() {
  return (
    <Section
      id="faq"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '40px 260px',
        width: '100%',
        height: 'fit-content',
        alignItems: 'center'
      }}
    >
      <Heading
        as="h3"
        size="6"
        style={{
          fontFamily: 'Epilogue',
          fontWeight: '500',
          color: '#55286F'
        }}
      >
        FAQ
      </Heading>
      <Text
        as="p"
        size="3"
        style={{
          fontFamily: 'Epilogue',
          fontWeight: '300',
          color: '#55286F',
          margin: 0
        }}
      >
        Questions fréquentes
      </Text>
      <Accordion.Root type="single" collapsible style={{
        // marginTop: 'var(--space-4)'
        width: '520px',
        backgroundColor: '#F9F9F9',
        gap: '4px',
        height: 'fit-content',
        boxShadow: '0 0 0 0.4px #A68DCE',
        borderRadius: '8px 30px 8px 30px',

      }}>
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} value={`item-${index}`} style={{
            textAlign: 'left',
            width: '100%',
            borderRadius: '0',
            border: 'none'
          }}>
            <Accordion.Trigger
              style={{
                display: 'flex',
                border: 'none',
                textAlign: 'left',
                borderRadius: '0',
                width: '100%',
                background: 'none',
                fontFamily: 'Epilogue',
                fontWeight: '500',
                color: '#55286F',
                padding: 'var(--space-6) var(--space-4)',
                height: 'fit-conent',
                alignItems: 'center',
                justifyContent: 'space-between',
                justifyItems: 'space-between',
                fontSize: '18px',
              }}
            >
              {faq.question}
              <CaretDown></CaretDown>
            </Accordion.Trigger>
            <Accordion.Content
              style={{
                fontFamily: 'Epilogue',
                fontWeight: '300',
                color: '#55286F',
                padding: 'var(--space-6) var(--space-4)',
              }}
            >
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Section>
  );
}
