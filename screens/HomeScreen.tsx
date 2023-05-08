import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: Props) {
  useEffect(() => {
    console.log("Home screen rendered");
  }, []);
  return (
    <View>
      <Text>Im home screen</Text>
      <Button
        title="Go to Planner"
        onPress={() => navigation.navigate("Planner")}
      />
    </View>
  );
}

export default HomeScreen;
