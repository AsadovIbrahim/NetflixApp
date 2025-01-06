import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { useEffect } from 'react';
import { useMMKVString,useMMKVBoolean } from 'react-native-mmkv';

import TabStack from './TabStack';

const Navigation = () => {

  const [token, setToken] = useMMKVString('token')
 
  return (
    <NavigationContainer>
      {token?<TabStack></TabStack>:<AuthStack></AuthStack>}
    </NavigationContainer>
  )
}

export default Navigation
