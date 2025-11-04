import React from 'react';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const StatusBarManager = ({ theme }) => {
  const insets = useSafeAreaInsets();
  const isLight = theme === 'light';

  return (
    <StatusBar
      barStyle={isLight ? 'dark-content' : 'light-content'}
      translucent={true}
    />
  );
};