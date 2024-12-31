import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenCast from "@icons/screencast.svg"
import Search from "@icons/search.svg"
import { useMMKVString } from 'react-native-mmkv'

const HomeHeader = () => {

  const [username,setUsername]=useMMKVString("username");

  return (
    <View className='w-full flex-row justify-between items-center p-2 py-2 bg-black'>
      <Text className='text-white font-extrabold text-3xl'>Welcome {username}</Text>

      <View className='flex-row items-center gap-4'>
      <TouchableOpacity>
        <ScreenCast/>
      </TouchableOpacity>

      
      <TouchableOpacity>
        <Search/>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeHeader