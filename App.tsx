import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import Navigation from "./navigation";
import useCachedResources from "./hooks/useCachedResources";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const isLoaded = useCachedResources();
  //console.log(isLoaded);
  const colorScheme = useColorScheme();

  if (isLoaded) {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  } else {
    return null;
  }
}
