import { useEffect, useRef, useState } from "react";

export function useCountDown(idx: number, initialCount: number) {
  const intervalRef = useRef<number>();
  const [countDown, setCountDown] = useState(initialCount);

  useEffect(() => {
    // debugger
    if (idx === -1) {
      return;
    }

    // setCountDown(workout!.sequence[trackerIdx].duration);

    intervalRef.current = window.setInterval(() => {
      setCountDown((count) => {
        // console.log(count);
        return count - 1;
      });
    }, 50);

    return cleanup;
  }, [idx]);

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
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return countDown;
}
