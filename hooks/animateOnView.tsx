import { useEffect, useState } from "react";

// Helper functie voor het verkrijgen van de timestamp
const getTimestampFromStorage = (): number => {
  const storedTimestamp = window.localStorage.getItem("timestamp");
  return storedTimestamp ? JSON.parse(storedTimestamp) : 1000;
};

// Helper functie voor het instellen van de timestamp in localStorage
const setTimestampToStorage = (timestamp: number): void => {
  window.localStorage.setItem("timestamp", timestamp.toString());
};

const useIntro = () => {
  const [hasTimePassed, setHasTimePassed] = useState<boolean | null>(null);

  useEffect(() => {
    const currTimestamp = Date.now();
    const storedTimestamp = getTimestampFromStorage();
    const timeLimit = 3 * 60 * 60 * 1000; // 3 hours

    const timeDifference = currTimestamp - storedTimestamp;
    const timePassed = timeDifference > timeLimit;

    // Update only if necessary
    if (timePassed && storedTimestamp !== currTimestamp) {
      setTimestampToStorage(currTimestamp);
    }

    // Set the state only if it has changed
    if (hasTimePassed === null || hasTimePassed !== timePassed) {
      setHasTimePassed(timePassed);
    }
  }, [hasTimePassed]); // Dependency array to avoid unnecessary updates

  return hasTimePassed;
};

export default useIntro;