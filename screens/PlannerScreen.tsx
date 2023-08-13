import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import { SequenceItem, SequenceType } from "../types/data";
import ExerciseItem from "../components/ExerciseItem";
import slugify from "slugify";
import { PressableText } from "../components/styled/PressableText";

type Props = NativeStackScreenProps<RootStackParamList, "Planner">;

export default function PlannerScreen({ navigation }: Props) {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);

  const handleFormSubmit = (form: ExerciseFormData) => {
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
      <ExerciseForm onSubmit={handleFormSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
