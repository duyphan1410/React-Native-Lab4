import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen, ForgotPasswordScreen, LoginScreen, SignupScreen } from
  './src/screens';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthenticatedUserProvider } from './src/providers';
const App = () => {
  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
};
export default App;
