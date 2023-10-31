import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { useSinuca } from "../context/SinucaContext";
import { useCountdown } from "../context/CountdownContext";

const FinishModal = () => {
  const { finishModal, setFinishModal, resetScore } = useSinuca();
  const { stop } = useCountdown();
  function dismiss() {
    setFinishModal(false);
    resetScore();
    stop();
  }
  console.log("finishModal", finishModal);
  return (
    <AwesomeAlert
      show={!!finishModal}
      showProgress={false}
      title={`Vitória de ${finishModal?.name}`}
      message={`${finishModal?.balls?.length} bolas encaçapadas`}
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

const styles = StyleSheet.create({});
