import React from 'react'
import TrendingMovies from './components/TrendingMovies'
import TrendingShows from './components/TrendingShows'
import { ScrollView } from 'react-native'
import Poster from './components/Poster'

const Homepage = () => {
  return (
    <ScrollView contentContainerStyle={{paddingBottom:20}} className='flex-1 bg-black'>
      <Poster/>
      <TrendingMovies/>
      <TrendingShows/>
    </ScrollView>
  )
}

export default Homepage