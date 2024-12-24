import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "./global.css"
import Navigation from './src/stacks/Navigation';

const App = () => {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App