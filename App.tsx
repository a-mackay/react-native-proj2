import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getMovieData } from './Api';

function Test() {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Text>holla everybody</Text>
            <Text>hiaoeu</Text>
        </View>
    );
}

const Stack = createStackNavigator();

export default function App() {
    console.log("key");
    getMovieData("fake");
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Test" component={Test} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
