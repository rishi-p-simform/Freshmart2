import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { CategorySelectors, useAppSelector } from '../../redux';
import { useTheme } from '../../hooks';
import { Text } from '../text';
import { styleSheet } from './FilterSelectorStyles';
import type { FilterSelectorProps } from './FilterSelectorTypes';

/**
 * Custom FilterSelector component
 * Renders selectable filter options or categories fetched using CategorySelectors.
 */
const FilterSelector: React.FC<FilterSelectorProps> = ({
  options,
  selectedCategoryId,
  onSelectCategory,
  customStyle,
  testID
}) => {
  const { styles } = useTheme(styleSheet);
  const categories = useAppSelector(CategorySelectors.getCategories);

  const filterItems = options ? options : [{ id: 'all', name: 'All' }, ...(categories || [])];

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      <FlatList
        data={filterItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected =
            (!options && item.id === 'all' && selectedCategoryId === null) ||
            item.id === selectedCategoryId;

          return (
            <Pressable
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onSelectCategory(!options && item.id === 'all' ? null : item.id)}
              accessibilityRole="button"
              accessibilityLabel={`Filter ${item.name}`}
            >
              <Text
                variant="labelMedium"
                style={[styles.chipText, isSelected && styles.chipTextSelected]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

FilterSelector.displayName = 'FilterSelector';
export default FilterSelector;
