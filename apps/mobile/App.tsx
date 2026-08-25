import { PIXEL_NAME, PIXEL_TAGLINE } from "@pixel/core";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.glow} pointerEvents="none" />

      <View style={styles.header}>
        <Text style={styles.mark}>●</Text>
        <Text style={styles.name}>{PIXEL_NAME}</Text>
        <Text style={styles.tagline}>{PIXEL_TAGLINE}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Parla con Pixel"
        onPress={() => {
          // Stage 1: no session, no audio, no network.
        }}
        style={({ pressed }) => [styles.talkButton, pressed && styles.talkButtonPressed]}
      >
        <Text style={styles.talkLabel}>Parla con Pixel</Text>
      </Pressable>

      <Text style={styles.hint}>La voce arriverà nelle prossime versioni.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#07080C",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingTop: 120,
    paddingBottom: 64,
  },
  glow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#3D5AFE",
    opacity: 0.18,
    top: 96,
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  mark: {
    color: "#8EA2FF",
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 8,
  },
  name: {
    color: "#F4F6FF",
    fontSize: 48,
    fontWeight: "600",
    letterSpacing: 1.2,
  },
  tagline: {
    color: "#9AA3C7",
    fontSize: 16,
    letterSpacing: 0.2,
    marginTop: 4,
  },
  talkButton: {
    backgroundColor: "#EEF1FF",
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 999,
    minWidth: 260,
    alignItems: "center",
    shadowColor: "#8EA2FF",
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  talkButtonPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: "#D9DFFF",
  },
  talkLabel: {
    color: "#0B1020",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  hint: {
    color: "#5C6588",
    fontSize: 13,
    textAlign: "center",
  },
});
