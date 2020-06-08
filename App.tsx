import React, { useEffect, useState } from 'react';
import { Button, FlatList,  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation, Route } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SimpleMovieInfo, MovieDetails, getMatchingMovies, getMovieInfo } from './Api';

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

interface SearchProps {
    navigation: any;
}

interface MovieDetailsProps {
    route: any;
}

function MovieDetailsScreen({route}: MovieDetailsProps) {
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    interface RouteParams {
        imdbId: string;
    };
    const {imdbId}: RouteParams = route.params;

    useEffect(
        () => {
            getMovieInfo(imdbId).then(data => setMovieDetails(data));
            console.log(movieDetails);
        },
        [imdbId]
    )

    return (
        <View>
            {movieDetails === null ? <MovieDetailsLoading/> : <MovieDetailsShowing movieDetails={movieDetails} />}
        </View>
    )
}

function MovieDetailsLoading() {
    return <View><Text>Loading...</Text></View>
}

interface MovieDetailsShowingProps {
    movieDetails: MovieDetails;
}

function MovieDetailsShowing({movieDetails}: MovieDetailsShowingProps) {
    return (
        <View>
            <Text>{movieDetails.title}</Text>
            <Text>{movieDetails.year}</Text>
            <Text>{movieDetails.genre}</Text>
            <Text>{movieDetails.imdbRating}</Text>
        </View>
    )
}

function Search({navigation}: SearchProps) {
    const [text, setText] = useState("");
    const onChangeText = (textInput: any) => {
        setText(textInput);
    }

    const onSubmit = () => {
        navigation.navigate("MovieList", {searchString: text});
    }
    return (
        <View>
            <Text style={styles.searchTextTitle}>Search for a movie:</Text>
            <TextInput style={styles.textInput} value={text} onChangeText={onChangeText} onSubmitEditing={onSubmit}></TextInput>
            {/* <Button title="Search" onPress={() => navigation.navigate("MovieList", {searchString: text})} /> */}
            <Button title="Search" onPress={onSubmit} />
        </View>
    )
}

function Other() {
    return (
        <View style={styles.container}>
            <Text>HELLO</Text>
        </View>
    )
}

interface MovieListProps {
    route: any;
}

function MovieList({route}: MovieListProps) {
    const [movies, setMovies] = useState<SimpleMovieInfo[]>([]);
    const navigation = useNavigation();
    const {searchString} = route.params;

    useEffect(
        () => { getMatchingMovies(searchString).then(data => setMovies(data)) },
        [searchString]
    )

    interface RenderItem {
        item: SimpleMovieInfo,
    }

    const renderItem = ({item}: RenderItem) => {
        return <ListItem
            title={item.title}
            subtitle={item.year.toString()}
            onPress={() => navigation.navigate("MovieDetails", {imdbId: item.imdbId})}
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
                <Stack.Screen name="Search" component={Search} options={{ title: "Search" }}></Stack.Screen>
                <Stack.Screen name="MovieList" component={MovieList} options={{ title: "Matches" }}/>
                <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ title: "Info" }}/>
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
    },
    searchTextTitle: {
        fontSize: 20,
    },
    textInput: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        fontSize: 20,
        color: "#000",
    }
});
