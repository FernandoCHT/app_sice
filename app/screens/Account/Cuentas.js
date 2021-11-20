import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Text } from "react-native";

//Importamos los componentes (vistas) de usuario logueado e invitado
import Logged from "./Logged";
import Invitado from "./Invitados";

export default function Cuentas() {
  //Inicializamos en null la variable que define el estado de la sesión
  const [login, setLogin] = useState(null);
  useEffect(() => {
    //verifica el estado de autenticación
    firebase.auth().onAuthStateChanged((user) => {
      {
        /* !user (si usuario es nullo o falso) Si la sesión existe cambia el
  estado de la variable de sesióna true, de lo contrario a false */
      }
      !user ? setLogin(false) : setLogin(true);
    });
  }, []); //[] si esta vacio el proceso de verificación se ejecuta una sola vez

  //Si el estado de sesión es null significa que esta en proceso de verificación
  if (login === null) return <Text>Cargando...</Text>;
  {
    /*Al recibir el estado de la sesión (useEffect)
  si login es true lanza la vista de Logged y si no la de Invitado */
  }
  return login ? <Logged /> : <Invitado />;
}
