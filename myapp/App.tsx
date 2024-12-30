import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "./global.css"
import { useTranslation } from 'react-i18next';
import Navigation from './src/stacks/Navigation';
import { useEffect } from 'react';
import "@locales/index";
import { enableScreens } from 'react-native-screens';
enableScreens();
 
import { useMMKVString } from 'react-native-mmkv';

const App = () => {
  const[selectedLanguage,setSelectedLanguage]=
  useMMKVString('selectedLanguage');
  
  const {i18n}=useTranslation();
  useEffect(()=>{
    if(selectedLanguage){
      i18n.changeLanguage(selectedLanguage);
    }
  },[selectedLanguage]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex:1}}>
        <Navigation/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App