import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
//Importamos las pantallas que deseamos agregar a la ruta
import Docentes from "../screens/Docentes/Docentes";
import AgregarDoc from "../screens/Docentes/AgregarDoc";
import Docente from "../screens/Docentes/Docente";

export default function RutasDocentes() {
  //Las primera pantalla que aparece en la pila será la que se muestre
  //por default al importar nuestro archivo
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="docente"
        component={Docentes}
        options={{ title: "Docentes" }}
      />
      <Stack.Screen
        name="agregar-doc"
        component={AgregarDoc}
        options={{ title: "Nuevo docente" }}
      />
      <Stack.Screen name="ver_docente" component={Docente} />
    </Stack.Navigator>
  );
}
