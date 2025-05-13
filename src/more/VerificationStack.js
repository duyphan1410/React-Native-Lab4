import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EmailVerificationScreen } from './EmailVerificationScreen';

const Stack = createNativeStackNavigator();

export const VerificationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
