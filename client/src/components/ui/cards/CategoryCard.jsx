import { Box, Heading, Flex, Button } from '@radix-ui/themes';
import { ArrowSquareOut } from 'phosphor-react';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ id, image, name }) {
  return (
    <Box id={id} className={styles.categoryCard}>
      <Box className={styles.cardContainer}>
        <Box className={styles.imageContainer}>
          <img
            src={image}
            alt={name}
            className={styles.categoryImage}
          />
        </Box>
        <Flex align="center" justify="center" className={styles.footer}>
          <Heading as="h4" size="4" className={styles.categoryName}>
            {name}
          </Heading>
          <Button asChild variant="surface" aria-label="View details" className={styles.iconButton}>
            <a href="#featured-products" style={{ color: 'inherit' }}>
              <ArrowSquareOut size={24} weight="duotone" />
            </a>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}