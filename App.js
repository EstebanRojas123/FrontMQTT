import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import WebView from "react-native-webview";

const BACKEND_URL = "http://192.168.134.30:3000/send-command";

export default function App() {
  const [relayState, setRelayState] = useState("off");

  const toggleRelay = async (state, topic) => {
    try {
      await axios.post(BACKEND_URL, {
        topic,
        message: state,
      });
      setRelayState(state);
    } catch (error) {
      console.error("Error al enviar comando:", error);
      Alert.alert("Error", "No se pudo enviar el comando al servidor.");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Panel de Control</Text>

        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <Button
              title="Encender Relé 1"
              onPress={() => toggleRelay("on", "arduino/relay1")}
            />
            <Button
              title="Apagar Relé 1"
              onPress={() => toggleRelay("off", "arduino/relay1")}
            />
          </View>

          <View style={styles.row}>
            <Button
              title="Encender Relé 2"
              onPress={() => toggleRelay("on", "arduino/relay2")}
            ></Button>

            <Button
              title="Apagar Relé 2"
              onPress={() => toggleRelay("on", "arduino/relay2")}
            ></Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    minHeight: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  status: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonContainer: {
    gap: 20,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
});
