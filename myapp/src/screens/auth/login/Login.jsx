import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { storage } from '@utils/MMKVStore'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const Login = () => {
    const navigation = useNavigation()
    const [formData, setFormData] = useState({})
   
    const handleInputChange = (name, text) => {
      setFormData(prevState => ({
        ...prevState, [name]: text
      }))
    }
   
    const login = async () => {
      try {
        const response = await fetch("http://192.168.0.103:5001/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData)
        })
   
        const data = await response.json()
   
        console.log(data)
   
        if (response.ok) {
          storage.set("token", data.token);
        } else {
          Alert.alert("Error", data.message);
        }
   
      } catch (error) {
        console.error(error)
      }
    }
   
    return (
     
     
     
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerClassName='flex-1 justify-center' className='bg-[#141115]'>
        <View className='p-6 gap-4 bg-[#141115] relative'>
          <TextInput onChangeText={text=>{
            handleInputChange("email",text)
          }} placeholder='Email address' placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}>
          </TextInput>
   
          <TextInput onChangeText={text=>{
            handleInputChange("password",text)
          }} placeholder='Password' placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}>
          </TextInput>
         
          <TouchableOpacity onPress={(login)} className='bg-[#E50A14] py-5 rounded-lg'><Text className='text-white text-center font-bold text-xl'>Sign In</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("Register")}}><Text className='text-gray-400 text-center mt-4'>Don't have an account? Sign up</Text></TouchableOpacity>
   
        </View>
   
      </KeyboardAwareScrollView>
    )
  }
   
  export default Login