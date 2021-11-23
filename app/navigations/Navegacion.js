import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Home from "../screens/home";
import Calificaciones from "../screens/Calificaciones";

import RutasCuentas from "./RutasCuenta";
import RutasDocentes from "./RutasDocentes";
import RutasAlumnos from "./RutasAlumnos";
import Alumnos from "../screens/Alumnos/Alumnos";

const Tab = createBottomTabNavigator();

export default function Navegacion() {
  return (
    <NavigationContainer>
      <Tab.Navigator //Define en que página deseas iniciar
        initialRouteName="home" //cuenta es el nombre definido en el Tab.Screen
        tabBarStyle={{
          //Color del texto e icono cuando no está activo.
          tabBarInactiveTintColor: "#52585E",
          //Color del texto e icono cuando está activo.
          tabBarActiveTintColor: "#00a680",
        }}
        //para cada ruta cargada en el proyecto entonces =>
        screenOptions={({ route }) => ({
          /*Se asigna el color de la ruta al icono y se ejecuta la función
 opciones que recibe la ruta del menú y color*/
          tabBarIcon: ({ color }) => opciones(route, color),
        })}
      >
        {/*Muestra un botón que se vincula a nuestro componente importado*/}
        <Tab.Screen
          name="home"
          component={Home}
          options={{ title: "Inicio" }}
        />
        <Tab.Screen
          name="calificaciones"
          component={Calificaciones}
          options={{ title: "Calificaciones" }}
        />
        <Tab.Screen
          name="alumnos"
          component={RutasAlumnos}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="docentes"
          component={RutasDocentes}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="cuentas"
          component={RutasCuentas}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function opciones(ruta, color) {
  let iconName;
  //De acuerdo al nombre de cada ruta se signa un icono
  switch (ruta.name) {
    case "home":
      //para buscar iconos https://materialdesignicons.com/
      iconName = "home";
      break;
    case "calificaciones":
      iconName = "class";
      break;
    case "alumnos":
      iconName = "people";
      break;
    case "docentes":
      iconName = "assignment-ind";
      break;
    case "cuentas":
      iconName = "person";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-comunity" name={iconName} size={22} color={color} />
  );
}
