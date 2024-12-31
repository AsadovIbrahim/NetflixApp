import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { storage } from '@utils/MMKVStore'
import { Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Register = () => {
    const navigation = useNavigation()
    const [formData, setFormData] = useState({})

    const handleInputChange = (name, text) => {
        setFormData(prevState => ({
            ...prevState, [name]: text
        }))
    }

    const register = async () => {
        try{

            const response = await fetch("http://192.168.0.103:5001/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (response.ok) {
                storage.set("firstname", data.user.firstname);
                storage.set("lastname", data.user.lastname);
                navigation.navigate("Login");
            } else {
                Alert.alert("Error", data.message || "An error occurred");
            }
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerClassName='flex-1 justify-center' className='bg-[#141115]'>
            <View className='flex-1 p-5 gap-4 pt-[200px]'>
                
                <TextInput onChangeText={(text) => {
                    handleInputChange("firstname", text)
                }} placeholder='Enter your fistname' placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}} />
              
                <TextInput onChangeText={(text) => {
                    handleInputChange("lastname", text)
                }} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}  placeholder='Enter your lastname'  />
               
                <TextInput onChangeText={(text) => {
                    handleInputChange("email", text)
                }} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}  placeholder='Enter your email'  />
             
                <TextInput onChangeText={(text) => {
                    handleInputChange("username", text)
                }} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}  placeholder='Enter your username'/>

                <TextInput onChangeText={(text) => {
                    handleInputChange("password", text)
                }}placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}  placeholder='Enter your password'  />

                <TouchableOpacity onPress={register} className='bg-[#E50A14] py-5 rounded-lg'><Text className='text-white text-center font-manropeBold text-lg'>Register</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("Login")
                }}><Text className='text-white text-center mt-4'>Already have an account?</Text></TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>

    )
}

export default Register