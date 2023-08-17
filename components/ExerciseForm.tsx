import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { PressableText } from "./styled/PressableText";

export type ExerciseFormData = {
  name: string;
  duration: string;
  reps?: number;
  type: string;
};

type WorkoutProps = {
  onSubmit: (form: ExerciseFormData) => void;
};

const selectionItems = ["exercise", "break", "stretch"];

export default function ExerciseForm({ onSubmit }: WorkoutProps) {
  const { control, handleSubmit } = useForm();
  const [isSelectionOn, setIsSelectionOn] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Duration"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
              />
            )}
          />
        </View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            name="reps"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Reps"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="type"
            render={({ field: { onChange, value } }) => (
              <View style={styles.area}>
                {isSelectionOn ? (
                  <View>
                    {selectionItems.map((selection) => (
                      <PressableText
                        style={styles.selection}
                        key={selection}
                        text={selection}
                        onPressIn={() => {
                          onChange(selection);
                          setIsSelectionOn(false);
                        }}
                      />
                    ))}
                  </View>
                ) : (
                  <TextInput
                    onPressIn={() => setIsSelectionOn(true)}
                    value={value}
                    style={styles.input}
                    placeholder="Type"
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                  />
                )}
              </View>
            )}
          />
        </View>
        <View style={{ alignItems: "center", marginBottom: 5 }}>
          <PressableText
            style={{ marginTop: 5,fontSize:18 }}
            text="Add Exercise"
            onPress={handleSubmit((data) => {
              onSubmit(data as ExerciseFormData);
            })}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    flex: 0.93,
    borderWidth: 1,
    height: 30,
    // margin: 2,
    paddingLeft: 5,
    marginTop: 3,
    marginBottom: 3,
    marginRight: 3,
    marginLeft: 3,
    // paddingLeft:4,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.4)",
  },
  rowContainer: {
    flexDirection: "row",
  },
  selection: {
    marginTop: 3,

    alignSelf: "center",
  },
  area: {
    flex: 1,
  },
});
