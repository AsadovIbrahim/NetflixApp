import React from 'react';
import './global.css';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
 
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <View className='flex-1 bg-blue-500 items-center'>
          <Text className='text-center'>Salam</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}