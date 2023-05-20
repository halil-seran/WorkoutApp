import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { clearWorkouts, getWorkouts, initWorkouts } from "../storage/workout";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsyc() {
      try {
        // await clearWorkouts();
        await initWorkouts();

        await Font.loadAsync({
          meera: require("../assets/fonts/MeeraInimai-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // const workouts = await getWorkouts();
        // console.log(workouts);
        setIsLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsyc();
  }, []);

  return isLoadingComplete;
}
