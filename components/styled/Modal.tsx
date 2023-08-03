import { Modal as DefaultModal, View, Text, StyleSheet } from "react-native";
import { PressableText } from "./PressableText";
import { Children, FunctionComponent, useState } from "react";

type ModalProps = {
  activator?: FunctionComponent<{ handleOpen: () => void }>;
  children: React.ReactNode;
};

export function Modal({ activator: Activator, children }: ModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <DefaultModal
        visible={isModalVisible}
        transparent={false}
        animationType="slide"
      >
        <View style={styles.centerView}>
          <View style={styles.contentView}>{children}</View>
          <PressableText
            text="Close Modal"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </DefaultModal>
      {Activator ? (
        <Activator handleOpen={() => setModalVisible(true)} />
      ) : (
        <PressableText text="Open" onPress={() => setModalVisible(true)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centerView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  contentView: {
    marginBottom: 20,
  },
});
