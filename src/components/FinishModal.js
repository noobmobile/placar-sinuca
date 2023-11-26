import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { useSinuca } from "../context/SinucaContext";
import { useCountdown } from "../context/CountdownContext";

const FinishModal = () => {
  const { finishModal, setFinishModal, resetScore, save } = useSinuca();
  const { stop } = useCountdown();
  function dismiss() {
    setFinishModal(false);
    resetScore();
    stop();
    save();
  }
  if (!finishModal) return;
  return (
    <AwesomeAlert
      show={!!finishModal}
      showProgress={false}
      title={`Vitória de ${finishModal?.name}`}
      customView={
        <View style={styles.container}>
          <Text style={styles.text}>
            {finishModal?.balls?.length} bolas encaçapadas
          </Text>
          <Text style={styles.text}>Informações sobre o jogo:</Text>
          <Text style={styles.text}>
            Localização:{" "}
            {typeof finishModal?.sensors?.location === "string"
              ? "Sem autorização"
              : `Latitude: ${finishModal?.sensors?.location?.coords?.latitude} Longitude: ${finishModal?.sensors?.location?.coords?.longitude}`}
          </Text>
          <Text style={styles.text}>
            Acelerômetro: X: {finishModal?.sensors?.accelerometer?.x} Y:{" "}
            {finishModal?.sensors?.accelerometer?.y} Z:{" "}
            {finishModal?.sensors?.accelerometer?.z}
          </Text>
          <Text style={styles.text}>
            Sensor de Luz: {finishModal?.sensors?.light?.illuminance} lx
          </Text>
        </View>
      }
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showConfirmButton={true}
      confirmText="Confirmar"
      onDismiss={dismiss}
      onConfirmPressed={dismiss}
      confirmButtonColor="#34b233"
    />
  );
};

export default FinishModal;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    color: "gray",
  },
});
