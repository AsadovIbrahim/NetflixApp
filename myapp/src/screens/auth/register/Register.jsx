import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { storage } from '@utils/MMKVStore'
import { Alert } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import { Image } from 'react-native'
import NetflixIcon from '@images/netflix-logo.png'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import VisibilityIcon from '@icons/visibility.svg'; 
import VisibilityOffIcon from '@icons/visibility_off.svg'; 

const Register = () => {
    const {t}=useTranslation();
    const navigation = useNavigation()
    const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
    const [formData, setFormData] = useState({})
    const [passwordVisible, setPasswordVisible] = useState(false); 


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
    const handleLanguage = () => {
        setSelectedLanguage((prevState) => (prevState === "en" ? "ru" : "en"));
      };

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerClassName='flex-1 justify-center' className='bg-[#141115]'>
            <Image source={NetflixIcon} className='mx-auto mt-20'/>
            <View className="w-full items-center relative mt-[40px]">
                <TouchableOpacity onPress={handleLanguage} className="absolute bottom-14 right-7">
                    <Text className="text-white">{t("language")}</Text>
                </TouchableOpacity>
            </View>
            <View className='flex-1 p-5 gap-4 pt-[100px]'>
                
                <TextInput onChangeText={(text) => {
                    handleInputChange("firstname", text)
                }} placeholder={t("firstname")} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}} />
              
                <TextInput onChangeText={(text) => {
                    handleInputChange("lastname", text)
                }} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}  placeholder={t("lastname")} />
               
                <TextInput onChangeText={(text) => {
                    handleInputChange("email", text)
                }} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}  placeholder={t("email")}  />
             
                <TextInput onChangeText={(text) => {
                    handleInputChange("username", text)
                }} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}  placeholder={t("username")}/>

<View className="relative">
                        <TextInput
                            onChangeText={text => {
                                handleInputChange("password", text);
                            }}
                            placeholder={t("password")}
                            placeholderTextColor="#767676"
                            className="border h-[52] bg-[#353236] pl-3 pr-10"
                            style={{ color: "white" }}
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-4"
                        >
                            {passwordVisible ? (
                                <VisibilityIcon width={24} height={24} fill="#767676" />
                            ) : (
                                <VisibilityOffIcon width={24} height={24} fill="#767676" />
                            )}
                        </TouchableOpacity>
                    </View>

                <TouchableOpacity onPress={register} className='bg-[#E50A14] py-5 rounded-lg'><Text className='text-white text-center font-manropeBold text-lg'>{t("register")}</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("Login")
                }}><Text className='text-white text-center mt-4'>{t("alreadyHaveAnAccount")}</Text></TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>

    )
}

export default Register