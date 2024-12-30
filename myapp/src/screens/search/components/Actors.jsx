import { View, Text } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'
import { useMMKVString } from 'react-native-mmkv'
import ActorItem from './ActorItem'
import { FlatList } from 'react-native'

const Actors = ({searchTerm}) => {
    const{token,setToken}=useMMKVString("token");
    const [actorData,setActorData]=useState([]);

    const getActorData=async()=>{
        try{
            const response=await fetch(`http://192.168.0.103:5001/api/v1/search/person/${searchTerm}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                    Accept:"application/json"
                }

            })
            const data=await response.json();
            setActorData(data.content);
        }
        catch(error){
            console.error(error);
        }
    }

    const NoItems = () => <View className='w-full h-full items-center justify-center'>
    <Text>No items found</Text>
    </View>


    useEffect(() => {
      searchTerm&& getActorData()
    }, [searchTerm])
    

    return (
        <View className='mt-6'>
        
              <Text className='font-manropeBold text-white text-2xl ml-2 mb-2'>Actors</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={NoItems}
                contentContainerStyle={{ gap: 8,paddingHorizontal:8}}
                data={actorData}
                renderItem={({ item }) => <ActorItem item={item}/>} />
            
            </View>
    )
}

export default Actors