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

export default function ListaAlumnos(propiedades) {
  const { alumnos } = propiedades;

  return (
    <View>
      {size(alumnos) > 0 ? (
        <FlatList
          data={alumnos}
          renderItem={(alumnos) => <Alumnos alumnos={alumnos} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.alumnos}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Alumnos</Text>
        </View>
      )}
    </View>
  );
}

function Alumnos(propiedades) {
  const { alumnos } = propiedades;

  const { nombre, apMat, apPat, grupo, matricula, perfil, creado } =
    alumnos.item;

  const consultarAlumno = () => {
    console.log("consultando");
  };
  return (
    <TouchableOpacity onPress={consultarAlumno}>
      <View style={styles.lista}>
        <View>
          <Text style={styles.nombre}>
            {nombre} {apPat} {apMat}
          </Text>
          <Text style={styles.grupo}>Grupo: {grupo}</Text>
          <Text style={styles.matricula}>Matrícula: {matricula}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  alumnos: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  lista: {
    flexDirection: "row",
    margin: 10,
  },
  nombre: {
    fontWeight: "bold",
  },
  grupo: {
    paddingTop: 2,
    color: "grey",
  },
  matricula: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
});
