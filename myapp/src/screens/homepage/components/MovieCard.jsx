import { TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'

const MovieCard = ({ item }) => {

  const navigation=useNavigation()

  return (
    <TouchableOpacity onPress={()=>{
      navigation.navigate("Details",{id:item.id,type:item.media_type})
    }}>
      <FastImage
        style={{ width: 125, height: 175 }}
        source={{
            uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            priority: item.media_type==="movie"?FastImage.priority.normal:FastImage.priority.low
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
    </TouchableOpacity>
  )
}

export default MovieCard;