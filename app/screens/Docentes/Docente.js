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
import CarouselImagenes from "../../components/CarouselImagenes";
const db = firebase.firestore(firebaseApp);
//Obtenemos el ancho de la ventana del dispositivo
const screenWidth = Dimensions.get("window").width;
import { map } from "lodash";
import { ListItem, Icon } from "react-native-elements";

export default function Docente(propiedades) {
  //Extraemos los objetos navigation y route
  const { navigation, route } = propiedades;
  //Extraemos el id y nombre contenido en el objeto params de route
  const { id, nombre } = route.params;

  //useState para almacenar datos de la sucursal
  const [docente, setDocente] = useState(null);

  useEffect(() => {
    /*setOption nos permite cambiar las propiedades del stack ver_sucursal, en
 nuestro caso cambiaremos el titulo de la ventana con el nombre de la
 sucursal seleccionada de la lista*/
    navigation.setOptions({ title: nombre });
  }, []);

  useEffect(() => {
    /*Consultamos la sucursal con id recibido como parámetro desde la lista de sucursales*/
    db.collection("docentes")
      .doc(id)
      .get()
      .then((resp) => {
        /*Extraemos los datos del documento recuperado en la consulta*/
        const datos = resp.data();
        /*Asignamos el id al conjunto de datos*/
        datos.id = resp.id;
        /*Asignamos los datos de la sucursal recuperado a nuestro useState*/
        setDocente(datos);
      });
  }, []);
  return (
    <View>
      {docente ? (
        <ScrollView>
          <CarouselImagenes
            /*Enviamos la lista de imagenes de la sucursal, el ancho
 alto que tomará el carousel */
            arrayImages={docente.imagenes}
            height={250}
            width={screenWidth}
          />

          <Informacion
            nombre={docente.nombre}
            correo={docente.correo}
            telefono={docente.telefono}
            perfil={docente.perfil}
          />
        </ScrollView>
      ) : (
        <View style={styles.docentes}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando información de Docente</Text>
        </View>
      )}
    </View>
  );
}

function Informacion(propiedades) {
  const { nombre, correo, telefono, grupos, perfil } = propiedades;
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
      text: grupos,
      iconName: "phone",
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.viewSucursal}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nombre}>{nombre}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  docentes: {
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
