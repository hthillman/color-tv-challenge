import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import SearchUsersScreen from '../screens/SearchUsersScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ImageViewScreen from '../screens/ImageViewScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
        <RootNavigator />
    </NavigationContainer>
  );
}


const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
     <Stack.Screen
        name="SearchUsersScreen"
        component={SearchUsersScreen}
        options={{ headerTitle: 'Users' }}
      />
       <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
       <Stack.Screen
        name="ImageViewScreen"
        component={ImageViewScreen}
        options={{ headerTitle: 'Image' }}
      />
    </Stack.Navigator>
  );
}
