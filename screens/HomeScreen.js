import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [featureCategories, setFeatureCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured"]{
      ...,
       resturants[]->{
        ...,
        dishes[]->
       }
    }`).then(data => {
      setFeatureCategories(data)
    })
  }, [])

  console.log(featureCategories);
  
  return (
    <SafeAreaView className="bg-white pt-5">
      <StatusBar backgroundColor="grey" />
      {/* HEADER */}

      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* SEARCH */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <SearchIcon color="gray" size={20} />
          <TextInput
            placeholder="Resturants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* BODY */}

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 130,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}


        {
          featureCategories?.map(category =>(
            <FeatureRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            />

          ))
        }

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
