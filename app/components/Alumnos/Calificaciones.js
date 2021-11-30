import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button, Rating, Icon } from "react-native-elements";
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const db = firebase.firestore(firebaseApp);

function Calificacion(propiedades) {
  const { navigation, id1 } = propiedades;
  const { id, title, createAt, calificacion, modificado } = propiedades.review;
  //Convertimos la fecha Timestamp de firebase a una fecha de JavaScript
  //Con una precision de millisecond.
  const createReview = new Date(createAt.seconds * 1000);
  //Recibe la lista de sucursales
  const { calificaciones } = propiedades;
  //en cada iteración obtiene los datos de la sucursal

  const navegacion = useNavigation();
  const consultarRestaurante = () => {
    navegacion.navigate("edit-calif-alumno", { id, title, calificacion });
  };

  const eliminar = () => {
    db.collection("calificaciones")
      .doc(id)
      .delete()
      .then(() => {
        console.log("calificacion eliminada: ");
      })
      .catch((error) => {
        console.error("Error al eliminar la calificacion: " + error);
      });
  };

  return (
    <TouchableOpacity onPress={consultarRestaurante}>
      <View style={styles.viewReview}>
        <View style={styles.viewInfo}>
          <Text style={styles.reviewTitle}>{title}</Text>
          <Text style={styles.reviewText}>{calificacion}</Text>
          {modificado ? (
            <Text style={styles.reviewM}>Modificada</Text>
          ) : (
            <Text />
          )}
          <Text style={styles.reviewDate}>
            {/*Extraemeo de la fecha los valores por separado */}
            {createReview.getDate()}/{createReview.getMonth() + 1}/
            {createReview.getFullYear()} - {createReview.getHours()}:
            {createReview.getMinutes() < 10 ? "0" : ""}
            {createReview.getMinutes()}
          </Text>
          <Icon
            raised
            name="trash"
            type="font-awesome"
            color="#f50"
            onPress={eliminar}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Reviews(propiedades) {
  //recibe la navegación de la ventana anterior
  // para regresar después de registrar la puntuación
  //y el id de la sucursal que se actualizará
  const { navigation, id, nombre } = propiedades;
  //Solo se permitirá registrar comentarios y valuación si existe sesión
  const [userLogged, setUserLogged] = useState(false);
  //estado que almacenará las puntuaciones registradas
  const [calificaciones, setReviews] = useState([]);
  //Validamos la existencia de sesión
  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      //consultamos la colección de reviews de la sucursal y almacenamos
      // los documentos en el useState de reviews
      db.collection("calificaciones")
        .where("idAlumno", "==", id)
        .get()
        .then((response) => {
          const resultReview = [];
          response.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            resultReview.push(data);
          });
          setReviews(resultReview);
        });
    }, [])
  );

  return (
    <View>
      {/*Si el usuario tiene sesión activa se permite registrar la opinión y voto,
        aparecerá un botón para abrir la ventana de votación*/}
      {userLogged ? (
        <Button
          title="Capturar calificación"
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.btnTitleAddReview}
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#0A6ED3",
          }}
          onPress={() =>
            navigation.navigate("add-calif-alumno", {
              id: id,
              nombre: nombre,
            })
          }
        />
      ) : (
        <View>
          {/*Si no hay sesión se solicita inicias sesión redirigiendo
            a la ventana de login */}
          <Text
            style={{ textAlign: "center", color: "#0A6ED3", padding: 20 }}
            onPress={() => navigation.navigate("login")}
          >
            Para capturar una calificación es necesario estar logeado{" "}
            <Text style={{ fontWeight: "bold" }}>
              pulsa AQUÍ para iniciar sesión
            </Text>
          </Text>
        </View>
      )}
      {/* cada review recuperado de la BD y almacenado en el useState
            Se visualizará con la estructura definida en la función Review */}
      {map(calificaciones, (review, index) => (
        <Calificacion key={index} review={review} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent",
  },
  btnTitleAddReview: {
    color: "#0A6ED3",
  },
  viewReview: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#0A6ED3",
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontWeight: "bold",
  },
  reviewText: {
    paddingTop: 2,
    color: "grey",
    marginBottom: 5,
  },
  reviewM: {
    paddingTop: 2,
    color: "grey",
    position: "absolute",
    right: 0,
    marginBottom: 5,
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
