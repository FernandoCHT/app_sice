import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
//Nos permitirá marcar la puntuación a través de estrellas
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const db = firebase.firestore(firebaseApp);

export default function EditCalificacion(propiedades) {
  const { navigation, route } = propiedades;
  const { id } = route.params;

  const [calificacion, setCalificacion] = useState(null);
  const [title, setTitle] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  //si todos los datos son correctos
  setIsLoading(true);
  //recuperamos los datos del usuario logueado
  const user = firebase.auth().currentUser;

  //Función para actualizar puntos de la sucursal
  const updateCalf = () => {
    //recuperamos el documento de la sucursal
    const califRef = db.collection("calificaciones").doc(id);
    califRef.get().then((response) => {
      //recuperamos los datos del documento
      const califData = response.data();

      const califResult = califData.calificacion;
      //actualizamos el documento de la sucursal con los datos modificados
      califRef
        .update({
          calificacion: califResult,
        })
        .then(() => {
          //cuando se realiza la actualización se envia a la ventana anterior
          setIsLoading(false);
          navigation.goBack();
        });
    });
  };

  return (
    <View style={styles.viewBody}>
      {/*Formulario de comentario */}
      <View style={styles.formReview}>
        <Input
          placeholder={title}
          containerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder={calificacion}
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setCalificacion(e.nativeEvent.text)}
        />
        <Button
          title="Enviar Comentario"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={EditCalificacion}
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
