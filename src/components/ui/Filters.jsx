import { Box, Heading, Slider, Checkbox, Flex, Text } from '@radix-ui/themes';

export function Filters({
  priceRange,
  setPriceRange,
  categories,
  selectedCategories,
  toggleCategory,
  volumes,
  selectedVolumes,
  toggleVolume,
}) {
  return (
    <Box
      style={{
        flex: '0 0 260px',
        backgroundColor: '#F9F9F9',
        borderRadius: '8px 30px 8px 30px',
        boxShadow: '0 0 0 0.4px #A68DCE',
        padding: '24px',
        width: '30%',
      }}
    >
      <Heading as="h3" size="5" style={{ color: '#55286F', marginBottom: 'var(--space-5)' }}>
        Filtres
      </Heading>
      <Box mb="4">
        <Text style={{ color: '#55286F' }}>Prix</Text>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={1000}
          step={10}
        />
        <Text style={{ color: '#55286F', fontSize: '14px' }}>
          {priceRange[0]} MAD - {priceRange[1]} MAD
        </Text>
      </Box>
      <Box mb="4">
        <Text style={{ color: '#55286F' }}>Catégories</Text>
        <Flex direction="column" gap="2" mt="2">
          {categories.map((cat) => (
            <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <Text style={{ color: '#55286F' }}>
                {cat.name} ({cat.product_count})
              </Text>
            </label>
          ))}
        </Flex>
      </Box>
      <Box>
        <Text style={{ color: '#55286F' }}>Volume</Text>
        <Flex direction="column" gap="2" mt="2">
          {volumes.map((v) => (
            <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                checked={selectedVolumes.includes(v)}
                onCheckedChange={() => toggleVolume(v)}
              />
              <Text style={{ color: '#55286F' }}>{v} ml</Text>
            </label>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
