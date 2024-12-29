import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
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
        const response = await fetch("http://192.168.0.103:5001/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        console.log(data)
    }

    return (
        <KeyboardAwareScrollView>
            <View className='flex-1 p-5 gap-4 pt-[450px]'>
                <TextInput onChangeText={(text) => {
                    handleInputChange("firstname", text)
                }} placeholderTextColor="#767676" placeholder='Enter your firstname' className='p-3 text-black border border-zinc-400 bg-white rounded-lg' />

                <TextInput onChangeText={(text) => {
                    handleInputChange("lastname", text)
                }} placeholderTextColor="#767676" placeholder='Enter your lastname' className='p-3 text-black border border-zinc-400 bg-white rounded-lg' />

                <TextInput onChangeText={(text) => {
                    handleInputChange("email", text)
                }} placeholderTextColor="#767676" placeholder='Enter your email' className='p-3 text-black border border-zinc-400 bg-white rounded-lg' />

                <TextInput onChangeText={(text) => {
                    handleInputChange("password", text)
                }} placeholderTextColor="#767676" placeholder='Enter your password' className='p-3 text-black border border-zinc-400 bg-white rounded-lg' />

                <TouchableOpacity onPress={register} className='bg-violet-600 py-5 rounded-lg'><Text className='text-white text-center'>Login</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("Login")
                }}><Text className='text-black text-center mt-4'>Already have an account?</Text></TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>

    )
}

export default Register