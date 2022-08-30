import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient from '../sanity'

const Categories = () => {
  const [categories, setCategories] = useState ([])
 
  useEffect (() => {
     sanityClient.fetch(`
     *[_type == "category"]
     `).then((data)=> {
      setCategories(data)
     })
  }, [])

  console.log('categories===>', categories);
  
  return (
    <ScrollView
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
    }}
    horizontal
    showsHorizontalScrollIndicator={false}
    >
        {/* Categories Card*/}
        {categories.map((category)=>(
          
          <CategoryCard key={category._id} imgUrl={category?.image} title={category.title}/>
        ))}
        
    </ScrollView>
  )
}

export default Categories 