import { Modal as DefaultModal, View, Text, StyleSheet } from "react-native";
import { PressableText } from "./PressableText";
import { Children, FunctionComponent, useState } from "react";

type ModalProps = {
  activator?: FunctionComponent<{ handleOpen: () => void }>;
  children: FunctionComponent<{
    handleOpen: () => void;
    handleClose: () => void;
  }>;
};

export function Modal({ activator: Activator, children }: ModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpen = () => {
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <DefaultModal
        visible={isModalVisible}
        transparent={false}
        animationType="slide"
      >
        <View style={styles.centerView}>
          <View style={styles.contentView}>
            {children({ handleOpen, handleClose })}
          </View>
          <PressableText text="Close Modal" onPress={handleClose} />
        </View>
      </DefaultModal>
      {Activator ? (
        <Activator handleOpen={handleOpen} />
      ) : (
        <PressableText text="Open" onPress={handleOpen} />
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
