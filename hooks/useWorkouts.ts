import { useEffect, useState } from "react";
import { Workout } from "../types/data";
import { getWorkouts } from "../storage/workout";
import { useIsFocused } from "@react-navigation/native";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const isFocused = useIsFocused(); //uygulamada home screende isek  true, baska bir ekrandaysak false donduruyor,boylece bu  ekrana  her girip ciktigimizda datakontrolu yapmis oluyoruz

  useEffect(() => {
    async function getData() {
      const _workouts = await getWorkouts();
      setWorkouts(_workouts);
    }

    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  return workouts;
};
