import { View, Text,Dimensions, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { useEffect, useState } from 'react'

const Poster = () => {
    const screenWidth=Dimensions.get("screen").width;
    const [visibleShow,setVisibleShow]=useState({})

    const getShowData = async () => {
        try {
          const response = await fetch('http://192.168.0.103:5001/api/v1/tv/trending')
          const data = await response.json()
    
           
          setVisibleShow(data.content[0]);
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(()=>{
        getShowData()
      },[])

  return (
    <View className='w-screen pt-4 relative'>
        <FastImage
        style={{ width: screenWidth, height: 500, borderRadius:14 }}
        source={{
            uri: `https://image.tmdb.org/t/p/original/${visibleShow.poster_path}`,
            priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
    />
        <View className='w-full p-[14px] absolute bottom-0 left-0 flex-row gap-10 justify-between items-center'>
            <TouchableOpacity className='bg-white w-[45%] py-[10px] rounded-[6px]'>
                <Text className='text-[#191B1E] text-xl font-extrabold text-center'>Play</Text>
            </TouchableOpacity>

            
            <TouchableOpacity className='bg-[#2E2B2F] w-[45%] py-[10px] rounded-[6px]'>
                <Text className='text-white text-xl font-extrabold text-center'>+ My List</Text>
            </TouchableOpacity>


        </View>

    </View>

    
  )
}

export default Poster