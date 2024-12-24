import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { useEffect } from 'react';
import { useMMKVString,useMMKVBoolean } from 'react-native-mmkv';
import Onboarding from '../screens/Onboarding/Onboarding';

const Navigation = () => {

  const [accessToken, setAccessToken] = useMMKVString('accessToken')
  const [firstTimeUser, setFirstTimeUser] = useMMKVBoolean("firstTimeUser")
  useEffect(() => {
        setFirstTimeUser(true);
    }, [1])
  return (
    firstTimeUser?<NavigationContainer><Onboarding/></NavigationContainer>:
    <NavigationContainer>
      {accessToken?<View></View>:<AuthStack></AuthStack>}
    </NavigationContainer>
  )
}

export default Navigation
