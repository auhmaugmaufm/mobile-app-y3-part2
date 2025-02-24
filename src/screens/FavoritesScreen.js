import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import RecipeCard from "../components/RecipeCard";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = ({ navigation }) => {

    const [favorites, setFavorite] = useState([])

  useEffect(() => {
    loadFavorites();
  }, [favorites])

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorite(JSON.parse(storedFavorites)); // อัปเดต state ถ้ามีค่า
            }
        } catch (error) {
            console.log('Failed to load favorites:', error);
        }
    };

    return (
        <View>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.idMeal.toString()} // ป้องกัน Key เป็น number
                renderItem={({ item }) => (
                    <RecipeCard
                        recipes={item}
                        isFav={favorites.some(fav => fav.idMeal === item.idMeal)} // ตรวจสอบว่าอยู่ใน Favorites ไหม
                        onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default FavoritesScreen
