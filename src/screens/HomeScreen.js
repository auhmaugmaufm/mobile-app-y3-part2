import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Image } from "react-native";
import axios from "axios";
import SearchBox from "../components/SearchBox";
import RecipeCard from "../components/RecipeCard";


const HomeScreen = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            //console.log(response.data.meals)
            setRecipes(response.data.meals)
        } catch (error) {
            console.error('Cannot fetching data ', error)
        }
    }

    return (
        <View>

            <SearchBox
                placeholder="Search recipes..."
                style={{ borderWidth: 1, padding: 10, margin: 8 }}
                value={search}
                onChangeText={(value) => setSearch(value)}
            />

            <FlatList
                data={recipes.filter((recipe) =>
                    recipe.strMeal.toLowerCase().includes(search.toLowerCase())  // ป้องกัน null
                )}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => {
                    return (
                        <RecipeCard
                            recipes={item}
                            onPress={() => navigation.navigate("RecipeDetail", {recipe: item} )}
                        />
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;