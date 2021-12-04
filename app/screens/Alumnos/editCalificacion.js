import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
//Nos permitirá marcar la puntuación a través de estrellas
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const db = firebase.firestore(firebaseApp);

export default function AddCalificacion(propiedades) {
  const { navigation, route } = propiedades;
  const { id, title, calificacion } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: title });
  }, []);

  const [title1, setTitle] = useState("");
  const [calificacion1, setCalificacion] = useState("");
  //nos permitirá saber cuándo ya se realizo el registro
  // y actualización de puntuación
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  const [error, setError] = useState(null);

  const updateCalif = () => {
    setError(null);
    setIsLoading(true);

    const califRef = db.collection("calificaciones").doc(id);
    califRef.get().then((response) => {
      califRef
        .update({
          title: title1,
          modificado: true,
          calificacion: calificacion1,
          createAt: new Date(),
        })
        .then(() => {
          //cuando se realiza la actualización se envia a la ventana anterior
          console.log("sirve");
          setIsLoading(false);
          navigation.goBack();
        })
        .catch(() => {
          setError("Error al actualizar");
          setIsLoading(false);
        });
    });

    //recuperamos el documento de la sucursal
  };

  //estructura de la venana
  return (
    <View style={styles.viewBody}>
      {/*Formulario de comentario */}
      <View style={styles.formReview}>
        <Input
          placeholder="Parcial"
          defaultValue={title}
          containerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
          errorMessage={error}
        />
        <Input
          placeholder="Calificación"
          defaultValue={calificacion}
          ContainerStyle={styles.input}
          onChange={(e) => setCalificacion(e.nativeEvent.text)}
          errorMessage={error}
        />
        <Button
          title="Capturar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={updateCalif}
          loading={isLoading}
        />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2",
  },
  formReview: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 150,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
  },
  btn: {
    backgroundColor: "#0A6ED3",
  },
});
