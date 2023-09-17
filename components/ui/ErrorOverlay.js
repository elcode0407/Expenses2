import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";
function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, styles.title]}>Error Occurred</Text>
      <Text style={[styles.textStyle, styles.message]}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
  },
});
