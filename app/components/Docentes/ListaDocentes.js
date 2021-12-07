import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListaDocentes(propiedades) {
  const { docentes } = propiedades;

  return (
    <View>
      {size(docentes) > 0 ? (
        <FlatList
          data={docentes}
          renderItem={(docentes) => <Docentes docentes={docentes} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.docentes}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Docentes</Text>
        </View>
      )}
    </View>
  );
}

function Docentes(propiedades) {
  //Recibe la lista de docentes
  const { docentes } = propiedades;
  //en cada iteración obtiene los datos del docente
  const { imagenes, nombre, apPat, apMat, correo, telefono, id } =
    docentes.item;
  //definimos el acceso a las rutas de docentes
  const navegacion = useNavigation();
  //Método que se ejecutará al dar clic a los items de la lista
  const consultarDocente = () => {
    navegacion.navigate("ver_docente", { id, nombre });
  };
  return (
    //Agregamos el clic a cada item al dar clic el item se opaca
    <TouchableOpacity onPress={consultarDocente}>
      {/*Esturctura de cada item */}
      <View style={styles.lista}>
        <View style={styles.viewImagen}>
          
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#0000ff" />}
            source={
              imagenes[0]
                ? { uri: imagenes[0] }
                : require("../../../assets/img/no-encontrada.png")
            }
            style={styles.imagen}
          />
        </View>
       
        <View>
          <Text style={styles.nombre}>
            {nombre} {""}
            {apPat} {""}
            {apMat}
          </Text>
          <Text style={styles.correo}>{correo}</Text>
          <Text style={styles.telefono}>{telefono}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  docentes: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  lista: {
    flexDirection: "row",
    margin: 10,
  },
  viewImagen: {
    marginRight: 15,
  },
  imagen: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  nombre: {
    fontWeight: "bold",
  },
  correo: {
    paddingTop: 2,
    color: "grey",
  },
  telefono: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
});
