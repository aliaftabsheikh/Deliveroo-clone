import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import ResturantCard from "./ResturantCard";
import sanityClient from "../sanity";

const FeatureRow = ({ title, description, id }) => {
  const [resturants, setResturants] = useState([ ])
  useEffect (() => {
    sanityClient.fetch(
      `
    *[_type == "featured" && _id == $id]{
      ...,
       resturants[]->{
        ...,
        dishes[]->,
        // type-> {
        //   name
        // }
       },
    }[0]
    `,
      { id }
    ).then(data => {
      setResturants(data?.resturants)
    })
  }, [id]);
console.log("Resturants", resturants);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RESTURANT_CARDS */}

{resturants?.map(resturant => (

  <ResturantCard
        key={resturant._id}
          id={resturant._id}
          imgUrl={resturant.image}
          address={resturant.address}
          title={resturant.name}
          dishes={resturant.dishes}
          rating={resturant.rating}
          genre={resturant.category}
          short_description={resturant.short_description}
          long={resturant.long}
          lat={resturant.lat}
        />

        ))}


        
      </ScrollView>
    </View>
  );
};

export default FeatureRow;