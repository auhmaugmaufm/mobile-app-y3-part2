import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBox from "../components/SearchBox";
import RecipeCard from "../components/RecipeCard";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites(); // โหลด Favorites ทุกครั้งที่กลับมาหน้านี้
        }, [])
    );

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites)); // อัปเดต state ถ้ามีค่า
            }
        } catch (error) {
            console.log('Failed to load favorites:', error);
        }
    };

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            if (response.data.meals) {
                setRecipes(response.data.meals);
            } else {
                setRecipes([]); // ป้องกัน recipes เป็น null
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <SearchBox
                placeholder="Search recipes..."
                style={styles.searchBox}
                value={search}
                onChangeText={(value) => setSearch(value)}
            />
            <FlatList
                data={recipes ? recipes.filter((recipe) =>
                    recipe.strMeal.toLowerCase().includes(search.toLowerCase())
                ) : []}
                keyExtractor={(item) => item.idMeal.toString()} // ป้องกัน Key เป็น number
                renderItem={({ item }) => (
                    <RecipeCard
                        recipes={item}
                        isFav={favorites.some(fav => fav.idMeal === item.idMeal)} // ตรวจสอบว่าอยู่ใน Favorites ไหม
                        onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
                    />
                )}
            />
            <TouchableOpacity
                style={styles.favButton}
                onPress={() => navigation.navigate("Favorites")} // ให้กดแล้วไปหน้า Favorites

            >
                console.log('Navigation clicked')
                <MaterialIcons name="favorite" size={28} color="#ff6f61" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative", // ทำให้ absolute ใช้งานได้
    },
    searchBox: {
        borderWidth: 1,
        padding: 10,
        margin: 8
    },
    favButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 50,
        elevation: 5, // เพิ่มเงาสำหรับ Android
        shadowColor: "#000", // เพิ่มเงาสำหรับ iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
});

export default HomeScreen;
