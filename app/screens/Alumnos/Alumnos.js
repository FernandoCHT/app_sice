import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListaAlumnos from "../../components/Alumnos/ListaAlumnos";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const db = firebase.firestore(firebaseApp);

export default function Alumnos() {
  const navegacion = useNavigation();

  //useState para arreglo de Sucursales
  const [alumnos, setAlumnos] = useState([]);
  //useState para contar sucursales
  const [totalAlu, setTotalAlu] = useState(0);
  //useState para mantener el control de las sucursales a mostrar
  const [puntero, setPuntero] = useState(null);

  //Consultando alumnos
  useEffect(() => {
    /*accedemos a la colección de sucursales, consultamos los registros
    con get y atrapamos la respuesta (se retorna una promesa con la lista sucursales)
    contamos y asignamos el total de sucursales al useState totalSuc*/
    db.collection("alumnos")
      .get()
      .then((res) => {
        setTotalAlu(res.size);
      });
    const arrAlumnos = [];
    db.collection("alumnos")
      .limit(10)
      .get()
      .then((res) => {
        setPuntero(res.docs[res.docs.length - 1]);
        res.forEach((doc) => {
          //extraemos cada documento y lo almacenamos en un objeto sucursal
          const alumno = doc.data();
          //la clave de la sucursal no asigna a menos que lo indiquemos
          alumno.id = doc.id;
          //almacenamos cada sucursal en un arreglo.
          arrAlumnos.push(alumno);
        });
        //Al terminar de recuperar todos los documentos los almacenamos en el useState sucursales
        setAlumnos(arrAlumnos);
      });
  }, []);

  return (
    <View style={styles.vista}>
      <ListaAlumnos alumnos={alumnos} />
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
});
