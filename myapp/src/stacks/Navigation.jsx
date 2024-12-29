import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { useEffect } from 'react';
import { useMMKVString,useMMKVBoolean } from 'react-native-mmkv';
import Onboarding from '../screens/Onboarding/Onboarding';
import { Text } from 'react-native';
import { View } from 'react-native';
import TabBar from './components/TabBar';
import TabStack from './TabStack';
import Login from '../screens/auth/login/Login';

const Navigation = () => {

  const [token, setToken] = useMMKVString('token')
 
  return (
    <NavigationContainer>
      {token?<TabStack></TabStack>:<AuthStack></AuthStack>}
    </NavigationContainer>
  )
}

export default Navigation
