import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../screens/homepage/Homepage';
import HomeHeader from './components/HomeHeader';

const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{header:()=><HomeHeader/>}}>
            <Stack.Screen name="HomeScreen" component={Homepage} />
        </Stack.Navigator>
    )
}

export default HomeStack