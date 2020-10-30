
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Inicio from './view/Inicio';
import NuevoCliente from './view/NuevoCliente';
import DetallesCliente from './view/DetallesCliente';
import {DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import BarraSuperior from './components/ui/Barra';


const Stack= createStackNavigator();
//Definir el 
const theme ={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    prymary: '#1774F2',
    accent: '#0655BF'
  }
}


const App = () => {
  return (
    <>
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle:{
            backgroundColor: theme.colors.primary
          },
          headerTintColor: theme.colors.surface,
          headerBackTitleStyle:{
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
        name="Inicio"
        component = {Inicio}
        options={({navigation,route})=>({
          headerTitleAlign:'center',
          headerLeft: (props)=><BarraSuperior {...props}
          navigation={navigation}
          route={route}
          />
        })}
       />
       <Stack.Screen
        name="NuevoCliente"
        component = {NuevoCliente}
        options={{
          title: "Nuevo Cliente"
        }}
       />
       <Stack.Screen
        name="DetallesCliente"
        component = {DetallesCliente}
        options={{
          title: "Detalles Cliente"
        }}
       />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
      
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
