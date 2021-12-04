import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
export default function Home() {
  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.banner}
          source={require("../../assets/img/inicio.jpg")}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.logo}
          source={require("../../assets/img/Logo.png")}
        />
      </View>

      <View>
        <Image
          style={styles.logosice}
          source={require("../../assets/img/logosice.png")}
        />
      </View>

      <View>
        <Text style={styles.texto}>CALIDAD TIPO</Text>
        <Text style={styles.texto}>DIAMANTE</Text>
        <Text style={styles.texto1}>
          Somos una empresa dedicada al desarrollo de software con el obtetivo
          de ofrecer los clientes un buen proyecto de tecnolgías.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 100,
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 60,
    marginTop: 20,
  },
  logo: {
    height: 80,
    marginTop: 10,
    flex: 1,
  },
  logosice: {
    height: 250,
    width: 300,
    marginHorizontal: 40,
    marginTop: 10,
  },
  texto: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 10,
  },
  texto1: {
    textAlign: "justify",
    fontSize: 20,
    marginTop: 20,
  },
});
