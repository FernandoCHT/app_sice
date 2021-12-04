import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { FireSQL } from "firesql";

const db = firebase.firestore(firebaseApp);
const fireSQL = new FireSQL(db, { includeId: "id" });

export default function Busquedas(propiedades) {
  const { navigation } = propiedades;
  const [search, setSearch] = useState("");
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM alumnos WHERE nombre LIKE '${search}%'`)
        .then((respose) => {
          setAlumnos(respose);
        });
    }
  }, [search]);
  return (
    <View>
      <SearchBar
        placeholder="Busca un alumno..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />

      {alumnos.length === 0 ? (
        <NoFound />
      ) : (
        <FlatList
          data={alumnos}
          renderItem={(alumno) => (
            <Alumno alumno={alumno} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function NoFound() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/img/sin-resultados.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

function Alumno(propiedades) {
  const { alumno, navigation } = propiedades;

  const { id, nombre, grupo, apPat, apMat, matricula } = alumno.item;

  return (
    <ListItem onPress={() => navigation.navigate("ver_alumno", { id, nombre })}>
      <ListItem.Content>
        <ListItem.Title>
          {nombre} {apPat} {apMat}
        </ListItem.Title>
        <Text style={{ paddingTop: 2, color: "grey" }}>Grupo:{grupo} </Text>
        <Text style={{ paddingTop: 2, color: "grey" }}>
          Matricula:{matricula}
        </Text>
      </ListItem.Content>
      <Icon type="material-community" name="chevron-right" />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
});
