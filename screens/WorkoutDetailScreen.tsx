import { View, Text, StyleSheet, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { PressableText } from "../components/styled/PressableText";
import { Modal } from "../components/styled/Modal";
import { formatSec } from "../utils/time";
import { FontAwesome } from "@expo/vector-icons";
import WorkoutItem from "../components/WorkoutItem";
import { useEffect, useState } from "react";
import { SequenceItem } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";

type Props = NativeStackScreenProps<RootStackParamList, "WorkoutDetail"> &
  DetailParams;

type DetailParams = {
  route: {
    params: {
      slug: string;
    };
  };
};

function WorkoutDetailScreen({ route }: Props) {
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [trackerIdx, setTrackerIdx] = useState(-1);

  const workout = useWorkoutBySlug(route.params.slug);

  const countDown = useCountDown(
    trackerIdx,
    trackerIdx >= 0 ? sequence[trackerIdx].duration : -1
  );

  const addItemToSequence = (idx: number) => {
    setSequence([...sequence, workout!.sequence[idx]]);
    setTrackerIdx(idx);
  };

  if (!workout) {
    return null;
  }

  return (
    <View style={styles.container}>
      <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText text="Check Squence" onPress={handleOpen} />
          )}
        >
          <View>
            {workout.sequence.map((si, idx) => (
              <View style={styles.sequenceItem} key={si.slug}>
                <Text>
                  {si.name} | {si.type} | {formatSec(si.duration)}
                </Text>
                {idx !== workout.sequence.length - 1 && (
                  <FontAwesome name="arrow-down" size={18} />
                )}
              </View>
            ))}
          </View>
        </Modal>
      </WorkoutItem>
      <View>
        {sequence.length === 0 && (
          <FontAwesome
            name="play-circle-o"
            size={100}
            onPress={() => addItemToSequence(0)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  centerView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  sequenceItem: {
    alignItems: "center",
  },
});

export default WorkoutDetailScreen;
