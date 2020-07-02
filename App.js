import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Navigation from './navigation';
import { Provider } from "react-redux";
import store from "./redux/store";



export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex:1}}>
        <Navigation />
        <StatusBar />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
