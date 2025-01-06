import { Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { storage } from '@utils/MMKVStore';
import { useMMKVString } from 'react-native-mmkv';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NetflixIcon from "@images/netflix-logo.png";
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@icons/visibility.svg'; 
import VisibilityOffIcon from '@icons/visibility_off.svg'; 

const Login = () => {
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");

    const navigation = useNavigation();
    const [formData, setFormData] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false); 

    const handleInputChange = (name, text) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: text,
        }));
    };

    const login = async () => {
        try {
            const response = await fetch("http://192.168.0.103:5001/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                storage.set("token", data.token);
                storage.set("firstname", data.user.firstname);
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLanguage = () => {
        setSelectedLanguage(prevState => (prevState === "en" ? "ru" : "en"));
    };

    return (
        <>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerClassName="flex-1 justify-center"
                className="bg-[#141115]"
            >
                <Image source={NetflixIcon} className="mx-auto mt-20" />

                <View className="w-full items-center relative mt-[40px]">
                    <TouchableOpacity onPress={handleLanguage} className="absolute bottom-14 right-7">
                        <Text className="text-white">{t("language")}</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 p-6 gap-4 bg-[#141115] pt-[150px]">
                    <TextInput
                        onChangeText={text => {
                            handleInputChange("email", text);
                        }}
                        placeholder={t("email")}
                        placeholderTextColor="#767676"
                        className="border h-[52] bg-[#353236] pl-3"
                        style={{ color: "white" }}
                    />

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

                    <TouchableOpacity
                        onPress={login}
                        className="bg-[#E50A14] py-5 rounded-lg font-manropeBold text-lg"
                    >
                        <Text className="text-white text-center font-bold text-xl">{t("signin")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text className="text-gray-400 text-center mt-4">
                            {t("dontHaveAnAccount")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </>
    );
};

export default Login;
