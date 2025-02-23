import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const ReceipeDetailScreenV2 = ({ route }) => {
    const { recipe } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(()=>{
        checkIsFavorite()
    },[])

    const checkIsFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites')
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : []
            const exists = favorites.some((fav)=>fav.idMeal === recipe.idMeal)
            setIsFavorite(exists)
        } catch (error) {
            console.error('Error Loading Favorite ', error)
        }
    }

    const renderIngredient = ({ item }) => (
        <View style={styles.ingredientItem}>
            <MaterialIcons name="check-circle" size={18} color="#ff6f61" />
            <Text style={styles.ingredientText}>{item}</Text>
        </View>
    );

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${ingredient} ${measure}`);
        }
    }

    const toggleFavorite = async() => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites')
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : []
            if(isFavorite) {
                // remove
                favorites = favorites.filter((fav)=>fav.idMeal != recipe.idMeal)
            } else {
                // Add
                favorites.push(recipe)
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
            setIsFavorite(!isFavorite)
        } catch (error) {
            console.error('Error saving favorite', error);
        }
        
    }

    return (
        <FlatList
            data={ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderIngredient}
            ListHeaderComponent={
                <>
                    <View style={styles.header}>
                        <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
                        <TouchableOpacity
                            style={styles.favoriteButton}
                            onPress={toggleFavorite}
                        >
                            <MaterialIcons
                                name={isFavorite ? "favorite" : "favorite-border"}
                                size={28}
                                color={isFavorite ? "#ff6f61" : "#fff"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>{recipe.strMeal}</Text>
                        <Text style={styles.category}>{recipe.strCategory}</Text>
                        <Text style={styles.sectionTitle}>Ingredients:</Text>
                    </View>
                </>
            }
            ListFooterComponent={
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Instructions:</Text>
                    <Text style={styles.instructions}>{recipe.strInstructions}</Text>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        position: "relative",
    },
    image: {
        width: "100%",
        height: 250,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    favoriteButton: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        padding: 10,
        borderRadius: 50,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    category: {
        fontSize: 16,
        color: "#777",
        textAlign: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
        color: "#ff6f61",
    },
    ingredientItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    ingredientText: {
        fontSize: 16,
        marginLeft: 8,
        color: "#333",
    },
    instructions: {
        fontSize: 16,
        color: "#555",
        marginTop: 5,
        lineHeight: 22,
    },
});

export default ReceipeDetailScreenV2;
