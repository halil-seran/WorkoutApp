import { useEffect, useRef, useState } from "react";

export function useCountDown(idx: number, initialCount: number = -1) {
  const intervalRef = useRef<number>();
  const [countDown, setCountDown] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // debugger
    if (idx === -1) {
      return;
    }
    // setCountDown(workout!.sequence[trackerIdx].duration);

    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCountDown((count) => {
          // console.log(count);
          return count - 1;
        });
      }, 50);
    }
    return cleanup;
  }, [idx, isRunning]);

  useEffect(() => {
    setCountDown(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (countDown === 0) {
      cleanup();
    }
  }, [countDown]);

  const cleanup = () => {
    if (intervalRef.current) {
      setIsRunning(false);
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return {
    countDown,
    isRunning,
    stop: cleanup,
    start: (count?: number) => {
      setCountDown(count ?? initialCount); // if the first value doesnt exist or undefined, then send the second one. || is same but it contains 0 and empty values
      setIsRunning(true);
    },
  };
}
