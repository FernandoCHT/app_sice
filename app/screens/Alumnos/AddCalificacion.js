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
  const { id, nombre } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: nombre });
  }, []);

  //definimos los useState para almacenar los datos de la votación
  const [calificacion, setCalificacion] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  //nos permitirá saber cuándo ya se realizo el registro
  // y actualización de puntuación
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();
  //Función que se ejecuta al enviar el comentario
  const addRevew = () => {
    //valida que se llenen todos los campos
    if (!title) {
      toastRef.current.show("No puedes dejar el campo vacío");
    } else if (!calificacion) {
      toastRef.current.show("Debes asignar una calificación");
    } else {
      //si todos los datos son correctos
      setIsLoading(true);
      //recuperamos los datos del usuario logueado
      const user = firebase.auth().currentUser;
      /*creamos la estructura de los datos a almacenar sobre el comentario
    usuario, sucursal a la que pertenece el comentario, titulo, descripción,
    puntos y fecha de creación*/
      const datos = {
        idUser: user.uid,
        idAlumno: id,
        title: title,
        calificacion: calificacion,
        createAt: new Date(),
      };

      //registramos los datos en la colección review
      db.collection("calificaciones")
        .add(datos)
        .then(() => {
          /*si se almacena el comentario, ejecutamos la actualización
 del raiting de la sucursal*/
          setIsLoading(false);
          navigation.goBack();
        })
        .catch(() => {
          toastRef.current.show("Error al enviar la calificación");
          setIsLoading(false);
        });
    }
  };

  //estructura de la venana
  return (
    <View style={styles.viewBody}>
      {/*Formulario de comentario */}
      <View style={styles.formReview}>
        <Input
          placeholder="Parcial"
          containerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder="Calificación..."
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setCalificacion(e.nativeEvent.text)}
        />
        <Button
          title="Capturar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={addRevew}
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
