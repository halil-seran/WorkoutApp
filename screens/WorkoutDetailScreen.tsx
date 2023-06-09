import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { PressableText } from "../components/styled/PressableText";

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
  const workout = useWorkoutBySlug(route.params.slug);

  if (!workout) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workout Detail</Text>
      <Text style={styles.header}>{workout.name}</Text>
      <PressableText text="Check Sequence" onPress={() => {}} />
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
});

export default WorkoutDetailScreen;
