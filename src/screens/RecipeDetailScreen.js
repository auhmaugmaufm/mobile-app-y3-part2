import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const RecipeDetailScreen = ({ route }) => {
    const { recipe } = route.params

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        { ingredient ? ingredients.push(ingredient) : null }
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: recipe.strMealThumb }}
                style={styles.image}
            />
            <Text style={styles.title}>{recipe.strMeal}</Text>
            <FlatList
                data={ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.ingredient}>{item}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    category: {
        fontSize: 18,
        color: "#888",
        marginBottom: 10,
    },
    ingredient: {
        fontSize: 16,
        lineHeight: 22,
        color: "#333",
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10
    }
});

export default RecipeDetailScreen;
