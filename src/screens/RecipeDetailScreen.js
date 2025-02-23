import React from "react";
import { ScrollView, Text, StyleSheet, Image, FlatList, View } from "react-native";

const RecipeDetailScreen = ({ route }) => {
    const { recipe } = route.params

    const ingredients = [];
    const measures = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        { ingredient && ingredient.trim() !== '' ? ingredients.push(ingredient) : null }
        const measure = recipe[`strMeasure${i}`]
        { measure && measure.trim() !== '' ? measures.push(measure) : null }
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: recipe.strMealThumb }}
                style={styles.image}
            />
            <Text style={styles.title}>{recipe.strMeal}</Text>
            <Text style={styles.sub}>Ingredients</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <FlatList
                    data={ingredients}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (
                        <Text style={styles.ingredient}>{item}</Text>
                    )}
                />
                <FlatList
                    data={measures}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (
                        <Text style={styles.ingredient}>{item}</Text>
                    )}
                />
            </View>
            <Text style={styles.ingredient}>Total of ingredients : {ingredients.length}</Text>
            <Text style={styles.sub}>Instructions</Text>
            <Text style={styles.instruction} >{recipe.strInstructions}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: 'center'
    },
    category: {
        fontSize: 18,
        color: "#888",
        marginBottom: 10,
    },
    ingredient: {
        fontSize: 16,
        //lineHeight: 22,
        color: "#333",
    },
    image: {
        width: '100%',
        height: 260,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 20,
    },
    instruction: {
        fontSize: 16,
        //lineHeight: 22,
        color: "#333",
    },
    sub: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 8
    }
});

export default RecipeDetailScreen;
