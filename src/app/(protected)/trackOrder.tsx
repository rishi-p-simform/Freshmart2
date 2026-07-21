import React, { type FC } from 'react';
import { TrackOrderScreen } from '../../modules';

/**
 * The Track Order Route Component
 * Standalone route for order tracking within protected routes (outside of tab bar).
 * @returns {React.ReactElement} The Track Order Screen.
 */
const TrackOrderRoute: FC = (): React.ReactElement => {
  return <TrackOrderScreen />;
};

export default TrackOrderRoute;
