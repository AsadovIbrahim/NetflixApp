import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { Button, Alert,Text,View, ScrollView, TouchableOpacity } from "react-native";
import { useMMKVString } from 'react-native-mmkv';
import YoutubePlayer from "react-native-youtube-iframe";
import Similar from './components/Similar';
import Play from '../../../assets/icons/play.svg';

const Details = () => {
    const [viewMore,setViewMore]=useState(false);
    const [playing,setPlaying]=useState(false);
    const {token,setToken}=useMMKVString("token");
    const [data,setData]=useState({});
    const [trailerKey,setTrailerKey]=useState("");
    const route=useRoute();
    const {id,type}=route.params

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          Alert.alert("video has finished playing!");
        }
      }, []);
    
      const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
      }, []);
    const getDataById=async()=>{
        try{
            const response=await fetch(`http://192.168.0.103:5001/api/v1/${type}/${id}/details`,{
                headers:{
                    "Accept":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            const data=await response.json();
            setData(data.content);

        }catch(error){
            console.error(error);
        }
    }

    

    const getTrailersById=async()=>{
        try{
            const response=await fetch(`http://192.168.0.103:5001/api/v1/${type}/${id}/trailers`,{
                headers:{
                    "Accept":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            const data=await response.json();
            setTrailerKey(data.trailers[0].key);

        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        getDataById()
        getTrailersById()
      return () => {
      }
    }, [id,type])
    
  return (
    <ScrollView style={{paddingBottom:40}} className='bg-black'>
      <YoutubePlayer
        height={240}
        play={playing}
        videoId={trailerKey}
        onChangeState={onStateChange}
      />
      <View className='px-3'>
        <Text className='text-white text-3xl font-extrabold mb-2 mt-3'>{type==="tv"?data.name:data.title}</Text>
        <TouchableOpacity className="rounded-[4px] my-3 flex-row justify-center bg-white py-4 items-center gap-2" onPress={togglePlaying}>
            <Play/>
            <Text className=' text-black font-extrabold text-lg'>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
            setViewMore(prevState=>!prevState)
        }}>
            <Text className='text-white text-lg'>{!viewMore?data.overview?.substring(0,150): data.overview}<Text className='font-bold text-zinc-500'>{!viewMore ?"...more":""}</Text></Text>
        </TouchableOpacity>
        <Similar id={id} type={type}/>
      </View>
    </ScrollView>
    )
}

export default Details