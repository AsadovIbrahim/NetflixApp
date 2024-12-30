import { useState } from "react";
import { View,Text,TextInput } from "react-native";
import Actors from "./components/Actors";
import ContentList from "../../common/ContentList";
import { ScrollView } from "react-native";

const Search=()=>{

    const[searchTerm,setSearchTerm]=useState("");

    return(
        <ScrollView contentContainerStyle={{backgroundColor:"black",flex:1}}>
            <TextInput placeholderTextColor="#827F83" placeholder="Search for Movies,TV Shows or Actors" className="bg-[#353236] mx-5 mt-8 rounded-[5px] px-3 py-4 text-white text-lg" onChangeText={(text)=>{
                setSearchTerm(text);
            }}/>
            {
                searchTerm&&
                <>
                    <Actors searchTerm={searchTerm}/>
                    <ContentList searchTerm={searchTerm} type="movie"/>
                    <ContentList searchTerm={searchTerm} type="tv"/>
                </>
            }
        </ScrollView>

    )
}
export default Search;