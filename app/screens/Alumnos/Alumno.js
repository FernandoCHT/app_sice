import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const db = firebase.firestore(firebaseApp);
//Obtenemos el ancho de la ventana del dispositivo

import { map } from "lodash";
import { ListItem, Icon } from "react-native-elements";

export default function Alumno(propiedades) {
  //Extraemos los objetos navigation y route
  const { navigation, route } = propiedades;
  //Extraemos el id y nombre contenido en el objeto params de route
  const { id, nombre, apPat } = route.params;

  //useState para almacenar datos de la sucursal
  const [alumno, setAlumno] = useState(null);

  useEffect(() => {
    /*setOption nos permite cambiar las propiedades del stack ver_sucursal, en
 nuestro caso cambiaremos el titulo de la ventana con el nombre de la
 sucursal seleccionada de la lista*/
    navigation.setOptions({ title: nombre, apPat });
  }, []);

  useEffect(() => {
    /*Consultamos la sucursal con id recibido como parámetro desde la lista de sucursales*/
    db.collection("alumnos")
      .doc(id)
      .get()
      .then((resp) => {
        /*Extraemos los datos del documento recuperado en la consulta*/
        const datos = resp.data();
        /*Asignamos el id al conjunto de datos*/
        datos.id = resp.id;
        /*Asignamos los datos de la sucursal recuperado a nuestro useState*/
        setAlumno(datos);
      });
  }, []);

  return (
    <View>
      {alumno ? (
        <ScrollView>
          <Informacion
            nombre={alumno.nombre}
            apPat={alumno.apPat}
            apMat={alumno.apMat}
            grupo={alumno.grupo}
            matricula={alumno.matricula}
            telefono={alumno.telefono}
            perfil={alumno.perfil}
            correo={alumno.correo}
          />
        </ScrollView>
      ) : (
        <View style={styles.alumnos}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando información del alumno</Text>
        </View>
      )}
    </View>
  );
}

function Informacion(propiedades) {
  const {
    nombre,
    apPat,
    apMat,
    grupo,
    telefono,
    matricula,
    correo,
    perfil,
    id,
  } = propiedades;
  const listaItems = [
    //podemos agregar multiples valores como no tenemos mas datos en la bd
    //colocaremos datos fijos para ejemplificar
    {
      text: telefono,
      iconName: "phone",
      iconType: "material-community",
      action: null,
    },
    {
      text: correo,
      iconName: "at",
      iconType: "material-community",
      action: null,
    },
  ];
  const listaItems2 = [
    //podemos agregar multiples valores como no tenemos mas datos en la bd
    //colocaremos datos fijos para ejemplificar
    {
      text: "Grupo: " + grupo,
      iconType: "material-community",
      action: null,
    },
    {
      text: "Matrícula: " + matricula,
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.viewSucursal}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nombre}>
          {nombre} {apPat} {apMat}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.correo}>Contacto</Text>
      </View>
      <View style={{ flexDirection: "row", position: "absolute", right: 15 }}>
        <Text style={styles.perfil}>{perfil}</Text>
      </View>
      <View>
        {listaItems.map((item, index) => (
          <ListItem key={index} containerStyle={styles.listaInfo}>
            <Icon name={item.iconName} type={item.iconType} color="#0A6ED3" />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.correo}>Informacion</Text>
        </View>
        {listaItems2.map((item, index) => (
          <ListItem key={index} containerStyle={styles.listaInfo}>
            <Icon name={item.iconName} type={item.iconType} color="#0A6ED3" />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alumnos: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  viewSucursal: {
    padding: 15,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
  },
  correo: {
    marginTop: 5,
    color: "grey",
  },
  telefono: {
    marginTop: 5,
    color: "grey",
  },
  perfil: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
    color: "black",
  },
  direccionTitulo: {
    fontWeight: "bold",
    marginTop: 5,
    color: "grey",
  },
  listaInfo: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
});
