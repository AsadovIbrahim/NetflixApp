import { useState, useEffect } from 'react'
import { Text, View, FlatList, SectionList, Dimensions } from 'react-native'
import ContentCard from '@common/ContentCard.jsx'


const ContentList = ({searchTerm,type}) => {

  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const response = await fetch(searchTerm ? `http://192.168.0.103:5001/api/v1/search/${type}/${searchTerm}`:`http://192.168.0.103:5001/api/v1/${type}/trending`)
      const data = await response.json()
      setData(data.content);
    } catch (error) {
      console.log(error)
    }
  }

  const NoItems = () => <View className='w-full h-full items-center justify-center'>
    <Text>No items found</Text>
  </View>

  useEffect(() => {
    getData()
  }, [searchTerm,type])


  return (
    <>
    <View className='mt-6'>

      <Text className='font-manropeBold text-white text-2xl ml-2 mb-2'>{searchTerm?"Results for"+` ${type==="tv"?"Shows":"Movies"}`:type==="movie" ?"Trending Movies":"Trending TV Shows"}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={NoItems}
        contentContainerStyle={{ gap: 8,paddingHorizontal:8}}
        data={data}
        renderItem={({ item }) => <ContentCard item={item} type={type} />} />
    
    </View>
    </>

  )
}

export default ContentList  