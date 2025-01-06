import { useState, useEffect } from 'react'
import { useMMKVString } from 'react-native-mmkv';
import { Text, View, FlatList} from 'react-native'
import { useTranslation } from 'react-i18next';
import ContentCard from '@common/ContentCard.jsx';

const Similar = ({id,type}) => {
    const{t}=useTranslation();
    const [data, setData] = useState([])
    const {token,setToken}=useMMKVString("token");
  

    const getSimilarById=async()=>{
        try{
            const response=await fetch(`http://192.168.0.103:5001/api/v1/${type}/${id}/similar`,{
                headers:{
                    "Accept":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            const data=await response.json();
            setData(data.similar)
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
      getSimilarById()
    }, [id,type])
  const NoItems = () => <View className='w-full h-full items-center justify-center'>
    <Text>No items found</Text>
  </View>



  return (
    <>
    <View className='mt-6'>
      <Text className='font-extrabold text-white text-xl mb-3'>{t("similar")} {type==="movie"?`${t("movies")}`:`${t("tvShows")}`}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={NoItems}
        contentContainerStyle={{ gap: 8}}
        data={data}
        renderItem={({ item }) => <ContentCard item={item} type={type}/>} />
    </View>
    
    </>

  )
}

export default Similar  