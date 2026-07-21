import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import DetailsProductScreen from '../../../modules/products/details-product';

export default function DetailsProductRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <DetailsProductScreen id={id || ''} />;
}
