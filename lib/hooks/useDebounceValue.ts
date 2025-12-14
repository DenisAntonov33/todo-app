import { useEffect, useState } from "react";

export const useDebounceValue = <T>(value: T, debounceTime: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [value, debounceTime]);

  return debouncedValue;
};
