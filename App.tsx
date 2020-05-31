import React, { useEffect, useState } from 'react';
import { Button, FlatList,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SimpleMovieInfo, getMatchingMovies } from './Api';

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

function MovieList() {
    const [movies, setMovies] = useState<SimpleMovieInfo[]>([]);
    const navigation = useNavigation();

    useEffect(
        () => { getMatchingMovies("fake").then(data => setMovies(data)) }
    )

    const renderItem = ({item}) => {
        return <ListItem
            title={item.title}
            subtitle={item.year.toString()}
            onPress={() => navigation.navigate("Other")}
        />
    }

    return (
        <FlatList
            data={movies}
            renderItem={renderItem}
            keyExtractor={item => item.imdbId}
        />
    );
}

interface ListItemProps {
    title: string;
    subtitle: string;
    onPress: () => void;
}

function ListItem({title, subtitle, onPress}: ListItemProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.listItem}>
                <Text style={styles.listItemTitle}>{title}</Text>
                <Text style={styles.listItemSubtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Stack = createStackNavigator();

export default function App() {
    getMatchingMovies("fake");
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MovieList" component={MovieList} options={{ title: "Matches" }}/>
                <Stack.Screen name="Test" component={Test} options={{ title: "Testscreen" }}/>
                <Stack.Screen name="Other" component={Other} options={{ title: "Otherscreen" }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItem: {
        padding: 10,
    },
    listItemTitle: {
        fontSize: 20,
    },
    listItemSubtitle: {
        color: "#aaa",
        fontSize: 17,
    }
});
