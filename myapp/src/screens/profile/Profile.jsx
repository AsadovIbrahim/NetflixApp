import { Alert, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storage } from '@utils/MMKVStore';
import Exit from '@icons/exit.svg';
import { useState, useEffect } from 'react';

const Profile = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [avatar, setAvatar] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        setFirstname(storage.getString('firstname') || 'Guest');
        setLastname(storage.getString('lastname') || '');
        setAvatar(storage.getString('avatar') || ''); // Placeholder for avatar URL
    }, []);

    const handleLogout = () => {
        storage.clearAll();
    };

    return (
        <View className='flex-1 bg-black p-4'>
            <View className='items-center mt-10'>
                <View className='w-[254px] h-[254px] bg-gray-500 rounded-full overflow-hidden'>
                    {avatar ? (
                        <Image
                            source={{ uri: avatar }}
                            className='w-full h-full'
                            resizeMode='cover'
                        />
                    ) : (
                        <Text className='text-white text-center mt-8'>No Avatar</Text>
                    )}
                </View>

                {/* User Name */}
                <Text className='text-white font-bold text-xl mt-4'>
                    {firstname} {lastname}
                </Text>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                onPress={handleLogout}
                className='px-5 py-3 self-center w-[140px] mt-10 rounded-lg'
            >
            <Exit/>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;
