import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation, route }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (route.params?.post) {
    }
  }, [route.params?.post]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Atualizar contador"
          onPress={() => setCount((c) => c + 1)}
          color="#fff"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela inicial</Text>
      <Button
        title="Ir para detalhes"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 17,
            otherParam: 'Qualquer coisa aqui',
          })
        }
      />
      <Button
        title="Criar Post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Button
        title="Atualizar Head"
        onPress={() => navigation.setOptions({ title: 'Atualizado!' })}
      />
      <Text>Post: {route.params?.post}</Text>
      <Text>{count}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="O que está na sua mente?"
        style={{ height: 200, padding: 10, backgroundColor: '#888' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

function DetailScreen({ route, navigation }) {
  const { itemId, otherparam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela de Detalhe</Text>
      <Text>ID: {JSON.stringify(itemId)}</Text>
      <Text>Outro Parâmetro: {JSON.stringify(otherparam)}</Text>
      <Button
        title="Ir para Detalhes de novo...."
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Ir para Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{
        uri:
          'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/41/static/media/react-native-logo.79778b9e.png',
      }}
    />
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailScreen}
            initialParams={{ itemId: 9 }}
          />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
