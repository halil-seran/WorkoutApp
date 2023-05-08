import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Planner">;

export default function PlannerScreen({ navigation }: Props) {
  useEffect(() => {
    console.log("planner screen rendered");
  }, []);

  return (
    <View>
      <Text>Im planner screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
