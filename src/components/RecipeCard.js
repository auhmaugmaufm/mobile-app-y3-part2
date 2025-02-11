import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const RecipeCard = ({ recipes, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: recipes.strMealThumb }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{recipes.strMeal}</Text>
                <View style={styles.footer}>
                    <Text style={styles.category}>Category: {recipes.strCategory}</Text>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        margin: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 4,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        //marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        //marginBottom: 5,

    },
    category: {
        fontSize: 18,
        color: "#555",
    },
    textContainer: {
        flex:1,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    footer: {
        flexDirection: 'row' , 
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default RecipeCard;