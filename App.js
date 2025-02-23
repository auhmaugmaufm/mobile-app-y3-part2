import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import ReceipeDetailScreenV2 from './src/screens/ReceipeDetailScreenV2';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: { backgroundColor: '#ff6f61' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 24, fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Gin Laew tie',
          }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={ReceipeDetailScreenV2}
          options={{
            title: 'Recipe Detail',
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: 'Favorite Foods',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
}
