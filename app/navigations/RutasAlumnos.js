import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
//Importamos las pantallas que deseamos agregar a la ruta
import Alumnos from "../screens/Alumnos/Alumnos";
import Alumno from "../screens/Alumnos/Alumno";

export default function RutasAlumnos() {
  //Las primera pantalla que aparece en la pila será la que se muestre
  //por default al importar nuestro archivo
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="alumno"
        component={Alumnos}
        options={{ title: "Alumnos" }}
      />
      <Stack.Screen name="ver_alumno" component={Alumno} />
    </Stack.Navigator>
  );
}
