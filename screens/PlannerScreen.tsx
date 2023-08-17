import { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import { SequenceItem, SequenceType, Workout } from "../types/data";
import ExerciseItem from "../components/ExerciseItem";
import slugify from "slugify";
import { PressableText } from "../components/styled/PressableText";
import { Modal } from "../components/styled/Modal";
import WorkoutForm, { WorkoutFormData } from "../components/WorkoutForm";
import { storeWorkout } from "../storage/workout";
import { PressableThemeText } from "../components/styled/PressableThemeText";

type Props = NativeStackScreenProps<RootStackParamList, "Planner">;

export default function PlannerScreen({ navigation }: Props) {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);

  const handleExerciseSubmit = (form: ExerciseFormData) => {
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + "-" + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };
    if (form.reps) {
      sequenceItem.reps = Number(form.reps);
    }
    setSeqItems([...seqItems, sequenceItem]);
  };

  const computeDiff = (exercisesCount: number, workoutDuration: number) => {
    const intensity = workoutDuration / exercisesCount;
    if (intensity <= 50) {
      return "hard";
    } else if (intensity <= 100) {
      return "normal";
    } else {
      return "easy";
    }
  };

  const handleWorkoutSubmit = async (form: WorkoutFormData) => {
    if (seqItems.length > 0) {
      // const duration = seqItems.reduce((acc, item) => {
      //   return acc + item.duration;
      // }, 0);
      let duration = 0;
      for (let i = 0; i < seqItems.length; i++) {
        duration = seqItems[i].duration + duration;
      }
      const workout: Workout = {
        name: form.name,
        slug: slugify(form.name + "-" + Date.now(), { lower: true }),
        difficulty: computeDiff(seqItems.length, duration),
        sequence: [...seqItems],
        duration,
      };
      await storeWorkout(workout);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={seqItems}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item}>
            <PressableText
              text="Remove"
              onPressIn={() => {
                const items = [...seqItems];
                items.splice(index, 1);
                setSeqItems(items);
              }}
            />
          </ExerciseItem>
        )}
        keyExtractor={(item) => item.slug}
      />
      <ExerciseForm onSubmit={handleExerciseSubmit} />
      <View>
        <Modal
          activator={({ handleOpen }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "#F42B03",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                marginTop: 10,
                borderRadius: 10,
              }}
              onPress={handleOpen}
            >
              <Text style={{ margin: 1, fontSize: 18, color: "white" }}>
                Create Workout
              </Text>
            </TouchableOpacity>
          )}
        >
          {({ handleClose }) => (
            <View>
              <WorkoutForm
                onSubmit={async (data) => {
                  await handleWorkoutSubmit(data);
                  handleClose();
                  navigation.navigate("Home");
                }}
              />
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
