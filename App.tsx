import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal, Dimensions, ScrollView } from 'react-native';
import Login from './src/login';
import Details from './src/details';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import TodoList from './src/tl';
import List from './src/list';
const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const windowWidth = Dimensions.get('window').width;

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My Todos" component={TodoList} options={{ headerShown: false}} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged (FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false}} />
        ) : (
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}