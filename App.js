import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: 'red' }} />
      <View style={{ height: 70, backgroundColor: 'red' }}></View>
      <View style={{ flex: 1, backgroundColor: 'blue' }}></View>
      <View style={{ height: 70, backgroundColor: 'white' }}></View>
      <SafeAreaView style={{ backgroundColor: 'white' }} />
    </View >
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
  }
});
