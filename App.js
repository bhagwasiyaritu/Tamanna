import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './app/utils/Routes';
import Home from './app/screens/Home';
import Splash from './app/screens/Splash';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Splash}>
        <Stack.Screen name={Routes.Splash} component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name={Routes.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
