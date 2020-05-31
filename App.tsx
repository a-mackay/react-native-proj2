import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getMatchingMovies } from './Api';

interface TestProps {
    navigation: any;
}

function Test({navigation}: TestProps) {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Text>holla everybody</Text>
            <Text>bbb</Text>
            <Button title="Clicky" onPress={() => navigation.navigate("Other")} />
        </View>
    );
}

function Other() {
    return (
        <View style={styles.container}>
            <Text>HELLO</Text>
        </View>
    )
}

const Stack = createStackNavigator();

export default function App() {
    getMatchingMovies("fake");
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Test" component={Test} options={{ title: "Testscreen" }}/>
                <Stack.Screen name="Other" component={Other} options={{ title: "Otherscreen" }}/>
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
