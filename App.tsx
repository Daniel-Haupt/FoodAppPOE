import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import Menu from './CheffMenu';
import GuestMenu from './GuestMenu';

const Stack = createNativeStackNavigator();

export default function App() {
  const [starters, setStarters] = useState<any[]>([]);
  const [mains, setMains] = useState<any[]>([]);
  const [desserts, setDesserts] = useState<any[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage">
          {(props) => (
            <HomePage
              {...props}
              starters={starters}
              mains={mains}
              desserts={desserts}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Menu">
          {(props) => (
            <Menu
              {...props}
              starters={starters}
              mains={mains}
              desserts={desserts}
              setStarters={setStarters}
              setMains={setMains}
              setDesserts={setDesserts}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="GuestMenu">
          {(props) => (
            <GuestMenu
              {...props}
              starters={starters}
              mains={mains}
              desserts={desserts}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
