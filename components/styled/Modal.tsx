import { Modal as DefaultModal, View, Text, StyleSheet } from "react-native";
import { PressableText } from "./PressableText";
import { useState } from "react";

export function Modal() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <DefaultModal
        visible={isModalVisible}
        transparent={false}
        animationType="slide"
      >
        <View style={styles.centerView}>
          <Text>new modal</Text>
          <Text>new modal</Text>
          <Text>new modal</Text>
          <Text>new modal</Text>
          <PressableText
            text="Close Modal"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </DefaultModal>
      <PressableText
        text="Check Sequence"
        onPress={() => setModalVisible(true)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centerView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
