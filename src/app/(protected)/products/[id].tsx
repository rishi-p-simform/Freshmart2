import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ProductsScreen } from '../../../modules/products';

export default function Product() {
  const { slug, id } = useLocalSearchParams<{
    slug: string;
    id: string;
  }>();

  return <ProductsScreen id={id || ''} slug={slug || ''} />;
}
