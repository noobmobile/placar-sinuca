import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { useSinuca } from "../context/SinucaContext";
import { useCountdown } from "../context/CountdownContext";

const HistoryModal = () => {
  const { historyModal, setHistoryModal, finishHistory } = useSinuca();
  function dismiss() {
    setHistoryModal(false);
  }
  const message = finishHistory
    .map((history, index) => {
      const date = new Date(history.date);
      const dateString = date.toLocaleDateString("pt-BR");
      return `${dateString}: ${history.name} - ${history.balls.length} bolas totalizando ${history.total} pontos.`;
    })
    .join("\n");
  return (
    <AwesomeAlert
      show={!!historyModal}
      showProgress={false}
      title={`Histórico`}
      message={message}
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

export default HistoryModal;

const styles = StyleSheet.create({});
