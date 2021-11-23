import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import Toast from "react-native-easy-toast";
//Importamos el formulario para registrar docente
import FormDoc from "../../components/Docentes/FormDoc";
export default function AgregarDoc() {
  const toastRef = useRef();

  return (
    <View>
      {/* Agregamos el formulario contenido en FormSuc */}
      <FormDoc toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}
const styles = StyleSheet.create({});
