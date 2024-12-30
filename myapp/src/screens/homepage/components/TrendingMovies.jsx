import { useState, useEffect } from 'react'
import { Text, View, FlatList, SectionList, Dimensions } from 'react-native'
import MovieCard from './MovieCard'

const TrendingMovies = () => {

  const [data, setData] = useState([])

  const getMovieData = async () => {
    try {
      const response = await fetch('http://192.168.0.103:5001/api/v1/movie/trending')
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
    getMovieData()
  }, [])


  return (
    <>
    <View className='mt-6'>
      <Text className='font-extrabold text-white text-xl ml-2 mb-2'>Trending Movies</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={NoItems}
        contentContainerStyle={{ gap: 8,paddingHorizontal:8}}
        data={data}
        renderItem={({ item }) => <MovieCard item={item} />} />
    </View>
    
    </>

  )
}

export default TrendingMovies  