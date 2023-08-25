import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setdebounceValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};
