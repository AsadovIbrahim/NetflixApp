import { useState } from "react";
import { FlatList,Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
 
const Onboarding = () => {

  const [activeIndex,setActiveIndex]=useState(0)
  const [fail,setFail]=useState(false) 
  const navigation = useNavigation()

  const onboardingItems = [
    {
        image: require("../../../assets/images/laptop.png"),
        title: "Watch on any device",
        desc: "Stream on your phone, tablet, laptop and TV without playing more"
    },
    {
        image: require("../../../assets/images/download.png"),
        title: "3, 2, 1,... download!",
        desc: "Always have something to Watch offline."
    },
    {
        image: require("../../../assets/images/population.png"),
        title: "No pesky contracts.",
        desc: "cancel anytime"
    },
    {
        image: require("../../../assets/images/avengers.png"),
        title: "How do I watch?",
        desc: "Members that subscribe to Netflix can watch here in the app"
    },
 
  ]
 
 
  const OnboardItem = ({ item }) => {
    return (
        <View className='items-center w-screen px-[40px]'>
            <Image source={item.image} className='size-[260px] object-scale-down' />
            <Text className='text-[24px] font-bold text-white text-center mt-[18px]'>{item.title}</Text>
            <Text className='text-[20px] text-[#CCC] text-center mt-5'>{item.desc}</Text>
        </View>
    )
  }
 
 
  const Dot=({index})=>{
    return (
      <View className={`size-[10px] ${activeIndex===index?"bg-red-600":"bg-white"}`}></View>
    )
  }
 
 
  const findIndex=({viewableItems})=>{
    setActiveIndex(viewableItems[0].index)
  }
 
  return (
    <ImageBackground className="flex-1 bg-black" {...(activeIndex===3?{source:onboardingItems[3].image}:{})}>
      <View className="w-full items-center relative mt-[40px] mb-[70px]">
        {/* <NetflixIcon/> */}
        <TouchableOpacity className="absolute right-7 top-3">
          <Text className="text-white">Help</Text>
        </TouchableOpacity>
      </View>
 
      <FlatList onViewableItemsChanged={findIndex} onScrollToIndexFailed={()=>{setFail(true)}} {...(!fail?{initialScrollIndex:3}:{})} pagingEnabled horizontal data={onboardingItems}
        renderItem={({ item }) => (
          <OnboardItem item={item}></OnboardItem>
        )}      
      />
     
      <View className="w-full justify-center flex-row gap-5">
        {onboardingItems.map((item,index)=><Dot key={index} index={index}></Dot>)}
      </View>
 
   
        <TouchableOpacity className="bg-[#E50914] py-4 mx-5 mt-10 mb-5" onPress={() => navigation.navigate("Login")}>
          <Text className="text-center text-white font-bold text-xl">
            Get Started
          </Text>
        </TouchableOpacity>
 
    </ImageBackground>
  ); 
};
 
export default Onboarding;