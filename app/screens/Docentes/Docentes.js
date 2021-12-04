import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import ListaDocentes from "../../components/Docentes/ListaDocentes";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
const db = firebase.firestore(firebaseApp);

export default function Docentes() {
  //definimos el acceso a las rutas de sucursales
  const navegacion = useNavigation();
  //useState para arreglo de Sucursales
  const [docentes, setDocentes] = useState([]);
  //useState para contar sucursales
  const [totalDoc, setTotalDoc] = useState(0);
  //useState para mantener el control de las sucursales a mostrar
  const [puntero, setPuntero] = useState(null);

  //useState de sesión
  const [usuario, setUsuario] = useState(null);
  //validamos sesión existente
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      //si existe una sesión activa asignamos los datos de sesión al useState usuario
      setUsuario(userInfo);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      /*accedemos a la colección de sucursales, consultamos los registros
  con get y atrapamos la respuesta (se retorna una promesa con la lista sucursales)
  contamos y asignamos el total de sucursales al useState totalSuc*/
      db.collection("docentes")

        .get()
        .then((res) => {
          setTotalDoc(res.size);
        });
      const arrDocentes = [];
      db.collection("docentes")
        .orderBy("creado", "desc")
        .limit(10)
        .get()
        .then((res) => {
          setPuntero(res.docs[res.docs.length - 1]);
          res.forEach((doc) => {
            //extraemos cada documento y lo almacenamos en un objeto sucursal
            const docente = doc.data();
            //la clave de la sucursal no asigna a menos que lo indiquemos
            docente.id = doc.id;
            //almacenamos cada sucursal en un arreglo.
            arrDocentes.push(docente);
          });
          //Al terminar de recuperar todos los documentos los almacenamos en el useState sucursales
          setDocentes(arrDocentes);
        });
    }, [])
  );

  return (
    <View style={styles.vista}>
      <ListaDocentes docentes={docentes} />
      {/*Colocaremos un botón de agregar nuevo docente*/}
      {usuario && (
        <Icon
          reverse
          type="material_community"
          name="add"
          color="#0A6ED3"
          containerStyle={styles.btn}
          //Vinculamos el envió a la ruta agregar-suc
          onPress={() => navegacion.navigate("agregar-doc")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  btn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    //Para IOS mostrará una sombra para el botón
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
