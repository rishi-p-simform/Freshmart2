import React, { type FC } from 'react';
import { Text, View } from 'react-native';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import styleSheet from './ExploreStyles';

/**
 * The ExploreScreen component.
 * @returns {React.ReactElement} A React element.
 */
const ExploreScreen: FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);

  return (
    <View style={styles.screenView}>
      <Text style={styles.textView}>{Strings.Explore.title}</Text>
    </View>
  );
};

export default ExploreScreen;
