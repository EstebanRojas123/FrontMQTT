import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BACKEND_URL = "http://:3000/send-command";

export default function App() {
  const [relay1State, setRelay1State] = useState("off");
  const [relay2State, setRelay2State] = useState("off");

  const sendCommand = async (state, topic, setRelayState) => {
    try {
      await axios.post(BACKEND_URL, { topic, message: state });
      setRelayState(state);
    } catch (error) {
      console.error("Error al enviar comando:", error);
      Alert.alert("Error", "No se pudo enviar el comando al servidor.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Control de Estufa</Text>

      <View style={styles.card}>
        <MaterialCommunityIcons name="fire" size={60} color="#FF5722" />
        <Text style={styles.cardTitle}>Relé 1</Text>
        <Text
          style={[
            styles.statusText,
            relay1State === "on" ? styles.onText : styles.offText,
          ]}
        >
          {relay1State === "on" ? "ENCENDIDO" : "APAGADO"}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.onButton]}
            onPress={() => sendCommand("on", "arduino/relay1", setRelay1State)}
          >
            <Text style={styles.actionText}>Encender</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.offButton]}
            onPress={() => sendCommand("off", "arduino/relay1", setRelay1State)}
          >
            <Text style={styles.actionText}>Apagar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <MaterialCommunityIcons name="fire" size={60} color="#FF5722" />
        <Text style={styles.cardTitle}>Relé 2</Text>
        <Text
          style={[
            styles.statusText,
            relay2State === "on" ? styles.onText : styles.offText,
          ]}
        >
          {relay2State === "on" ? "ENCENDIDO" : "APAGADO"}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.onButton]}
            onPress={() => sendCommand("on", "arduino/relay2", setRelay2State)}
          >
            <Text style={styles.actionText}>Encender</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.offButton]}
            onPress={() => sendCommand("off", "arduino/relay2", setRelay2State)}
          >
            <Text style={styles.actionText}>Apagar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    paddingVertical: 30,
  },
  header: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 30,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#2c2c2c",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    color: "#fff",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
  },
  onText: {
    color: "#4caf50",
  },
  offText: {
    color: "#f44336",
  },
  actions: {
    flexDirection: "row",
    gap: 15,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  onButton: {
    backgroundColor: "#4caf50",
  },
  offButton: {
    backgroundColor: "#f44336",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
